package com.budgetapp;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/** Saves and opens backup files through the Storage Access Framework pickers. */
public class BackupFileModule extends ReactContextBaseJavaModule {

  private static final int SAVE_REQUEST = 4201;
  private static final int OPEN_REQUEST = 4202;

  private Promise pendingPromise;
  private String pendingContents;

  private final ActivityEventListener activityEventListener =
      new BaseActivityEventListener() {
        @Override
        public void onActivityResult(
            Activity activity, int requestCode, int resultCode, Intent data) {
          if ((requestCode != SAVE_REQUEST && requestCode != OPEN_REQUEST)
              || pendingPromise == null) {
            return;
          }
          Promise promise = pendingPromise;
          String contents = pendingContents;
          pendingPromise = null;
          pendingContents = null;

          if (resultCode != Activity.RESULT_OK || data == null || data.getData() == null) {
            promise.resolve(null);
            return;
          }
          Uri uri = data.getData();
          try {
            if (requestCode == SAVE_REQUEST) {
              writeFile(uri, contents);
              promise.resolve(uri.toString());
            } else {
              promise.resolve(readFile(uri));
            }
          } catch (Exception e) {
            promise.reject("E_BACKUP_IO", e.getMessage(), e);
          }
        }
      };

  BackupFileModule(ReactApplicationContext context) {
    super(context);
    context.addActivityEventListener(activityEventListener);
  }

  @Override
  public String getName() {
    return "BackupFile";
  }

  /** Resolves with the saved file's URI, or null if the user cancelled. */
  @ReactMethod
  public void save(String fileName, String contents, Promise promise) {
    Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
    intent.addCategory(Intent.CATEGORY_OPENABLE);
    intent.setType("application/json");
    intent.putExtra(Intent.EXTRA_TITLE, fileName);
    start(intent, SAVE_REQUEST, contents, promise);
  }

  /** Resolves with the chosen file's text, or null if the user cancelled. */
  @ReactMethod
  public void open(Promise promise) {
    Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
    intent.addCategory(Intent.CATEGORY_OPENABLE);
    // Drive and others often don't tag .json files as application/json.
    intent.setType("*/*");
    start(intent, OPEN_REQUEST, null, promise);
  }

  private void start(Intent intent, int requestCode, String contents, Promise promise) {
    Activity activity = getCurrentActivity();
    if (activity == null) {
      promise.reject("E_NO_ACTIVITY", "App is not in the foreground.");
      return;
    }
    if (pendingPromise != null) {
      promise.reject("E_BUSY", "A file picker is already open.");
      return;
    }
    pendingPromise = promise;
    pendingContents = contents;
    try {
      activity.startActivityForResult(intent, requestCode);
    } catch (Exception e) {
      pendingPromise = null;
      pendingContents = null;
      promise.reject("E_PICKER", e.getMessage(), e);
    }
  }

  private void writeFile(Uri uri, String contents) throws Exception {
    // "wt" truncates when overwriting an existing, longer file.
    try (OutputStream out =
        getReactApplicationContext().getContentResolver().openOutputStream(uri, "wt")) {
      if (out == null) {
        throw new Exception("Could not open file for writing.");
      }
      out.write(contents.getBytes(StandardCharsets.UTF_8));
    }
  }

  private String readFile(Uri uri) throws Exception {
    try (InputStream in = getReactApplicationContext().getContentResolver().openInputStream(uri)) {
      if (in == null) {
        throw new Exception("Could not open file for reading.");
      }
      ByteArrayOutputStream bytes = new ByteArrayOutputStream();
      byte[] buffer = new byte[8192];
      int read;
      while ((read = in.read(buffer)) != -1) {
        bytes.write(buffer, 0, read);
      }
      return new String(bytes.toByteArray(), StandardCharsets.UTF_8);
    }
  }
}
