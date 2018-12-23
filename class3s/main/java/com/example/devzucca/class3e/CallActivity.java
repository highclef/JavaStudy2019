package com.example.devzucca.class3e;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

public class CallActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_call);
        
        String message = getIntent().getStringExtra("intent-message");
        Toast.makeText(CallActivity.this, message, Toast.LENGTH_SHORT).show();
    }
}
