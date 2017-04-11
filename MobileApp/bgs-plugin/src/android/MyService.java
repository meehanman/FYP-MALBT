package technology.dean.backgroundservice;

//Import BGS that is installed
import com.red_folder.phonegap.plugin.backgroundservice.BackgroundService;
//Import com.pylonproducts.wifiwizard
import com.pylonproducts.wifiwizard.WifiWizard;
//Import JSON Stuff
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;
//Java stuff
import android.util.Log;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.io.*;
import java.net.*;
//Taking stuff from WifiWizard
import java.util.List;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiEnterpriseConfig;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiInfo;
import android.net.wifi.SupplicantState;
import android.content.Context;
import android.util.Log;
//Shared preferences
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
//Bluetooth
import com.evothings.BLE;
/**
* @Author: Dean Meehan
*/
public class MyService extends BackgroundService {

    private WifiManager wifiManager;
    private JSONObject config = new JSONObject();
    private static String MY_PREFS_NAME = "MyServiceConfig";
    private static String LOG_NAME = "DeansLocationService";

    ///Do work is run by the background service every n miliseconds.
    @Override
    protected JSONObject doWork() {
        JSONObject result = new JSONObject();

        //Ensure we have access to the wifiManager
        this.wifiManager = (WifiManager) this.getSystemService(Context.WIFI_SERVICE);

        try {
            // Following three lines simply produce a text string with Hello World and the date & time (UK format)
            SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            String now = df.format(new Date(System.currentTimeMillis()));

            // We output the message to the logcat
            Log.d(LOG_NAME, now+" (getConfig:)");
            Log.d(LOG_NAME, this.config.toString());


            // We also provide the same message in our JSON Result
            result.put("Message", getScanResults());
        } catch (JSONException e) {
            // In production code, you would have some exception handling here
        }

        return result;
    }

    @Override
    protected JSONObject getConfig() {
      // Restore preferences
      SharedPreferences prefs = getSharedPreferences(MY_PREFS_NAME, MODE_PRIVATE);
        try{
          this.config.put("name", prefs.getString("name", "Undefined"));
          this.config.put("onLoadValue", prefs.getString("name", "Undefined"));
        }catch(Exception e){
            Log.d(LOG_NAME, e.toString());
        }
          Log.d(LOG_NAME,"getConfig Called:Config below that is being returned");
          Log.d(LOG_NAME,this.config.toString());
        return this.config;
    }

    @Override
	  protected void setConfig(JSONObject config) {
        Log.d(LOG_NAME,"SetConfig Called:Config below that was passed in");
        Log.d(LOG_NAME, config.toString());

       SharedPreferences.Editor editor = getSharedPreferences(MY_PREFS_NAME, MODE_PRIVATE).edit();
       try{
       editor.putString("onLoadValue", config.getString("onLoadValue"));
       editor.putString("name", config.getString("name"));
     }catch(Exception e){
       Log.d(LOG_NAME, e.toString());
       }
       editor.commit();

       //Update Config
       getConfig();
	  }

    @Override
    protected JSONObject initialiseLatestResult() {
        Log.d(LOG_NAME, "initialiseLatestResult called()");
        return null;
    }

    /**
     * Returns HTML from Ping url
     */
    public String postHTML(String urlToRead, JSONObject data) throws Exception {
        Log.d(LOG_NAME, "postHTML called");

        //Setup connection
        URL url = new URL(urlToRead);
        HttpURLConnection  httpConnection = (HttpURLConnection ) url.openConnection();
        httpConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        httpConnection.setRequestProperty("Authorization", "Basic ZDNhbi5tZWVoYW5AaG90bWFpbC5jb206UGFzc3dvcmQ=");
        httpConnection.setRequestMethod("POST");


        //Get writer from output stream
        OutputStream os = httpConnection.getOutputStream();
        OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");

        //Write, flush and close the connection
        osw.write(data.toString());
        osw.flush();
        osw.close();

        BufferedReader in = new BufferedReader(
                new InputStreamReader(
                        httpConnection.getInputStream()));
        String inputLine;

        while ((inputLine = in.readLine()) != null)
            Log.d(LOG_NAME, inputLine);
        in.close();

        //Return data
        return "Posted to "+urlToRead+" :: "+data.toString();
    }

    /**
     * This method uses the callbackContext.success method to send a JSONArray
     * of the scanned networks.
     *
     */
    public String getScanResults() {
        Log.d(LOG_NAME, "getScanResults()");

        //Scan Wifi for current BSSIDs used for tracking
        List<ScanResult> scanResults = wifiManager.getScanResults();
        JSONArray accessPointsList = new JSONArray();

        for (ScanResult scan : scanResults) {
            try {
                accessPointsList.put(scan.BSSID);
            } catch (Exception e) {
                e.printStackTrace();
                Log.d(LOG_NAME, e.toString());
            }
        }
        try {
            //Build JSON Oject
            JSONObject postData = new JSONObject();
            postData.put("access_point", accessPointsList);

            //Log results of sending html post
            Log.d(LOG_NAME, postHTML("https://cloud.dean.technology/poll", postData));

        } catch (Exception e) {
            Log.d(LOG_NAME, "Oh shit! Error");
            Log.d(LOG_NAME, e.getClass().getCanonicalName());
            e.printStackTrace();
        }

        return accessPointsList.toString();
    }

}