
goog.provide('colab.install');


/**
 * OAuth 2.0 scope for installing Drive Apps.
 * @const
 */
colab.install.OAUTH_SCOPE = 'https://www.googleapis.com/auth/drive.install';


/** @const */
colab.install.FILE_SCOPE = 'https://www.googleapis.com/auth/drive';


/**
 * Google cloud services client id. Found in the project console for CoLab
 * Sandbox.
 *
 * @type {string}
 */
colab.install.CLIENT_ID = '691922180140-b67r6ajtiks1ca777g6nqhm5fairqp1f' +
    '.apps.googleusercontent.com';


/**
 * Installs the Colaboratory App on Google Drive.
 * @param {boolean} immediate Whether to return immediately or show prompt
 * @param {Function} callback Callback for success or failure
 */
colab.install.install = function(immediate, callback) {
  gapi.load('auth:client', function() {
    // Special procedure for when in Chrome App mode.
    if (colab.app.appMode) {
      colab.app.authorize(immediate, callback);
      return;
    }

    // Otherwise, using standard OAuth flow.
    gapi.auth.authorize({
      client_id: colab.install.CLIENT_ID,
      scope: [colab.install.OAUTH_SCOPE,
              colab.install.FILE_SCOPE],
      immediate: immediate
    }, callback);
  });
};
