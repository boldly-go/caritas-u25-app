package de.caritas.u25;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.android.BuildConfig;

public class MainActivity extends BridgeActivity {
    @Override
    public void onStart() {
        super.onStart();

        if (BuildConfig.DEBUG) {
            EnableHttpsSelfSigned.enable(this.getBridge());
        }
    }
}
