package com.mobileapp

import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {
    private val TAG = "FCMService"

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        try {
            // Log basic info about the message
            Log.d(TAG, "From: ${remoteMessage.from}")
            
            // Check if message contains a notification payload
            remoteMessage.notification?.let {
                Log.d(TAG, "Message Notification Title: ${it.title}")
                Log.d(TAG, "Message Notification Body: ${it.body}")
            }
            
            // Check if message contains data payload
            if (remoteMessage.data.isNotEmpty()) {
                Log.d(TAG, "Message Data: ${remoteMessage.data}")
                
                // Process data payload if needed
                // You can send data to your React Native app here if needed
            }
            
            // Note: This method is called when the app is in the foreground
            // For background notifications, the system automatically displays the notification
        } catch (e: Exception) {
            Log.e(TAG, "Error processing message", e)
        }
    }

    override fun onNewToken(token: String) {
        try {
            Log.d(TAG, "Refreshed FCM token: $token")
            
            // If you need to send the token to your server, do it here
            // For example, you might want to associate this token with a user
        } catch (e: Exception) {
            Log.e(TAG, "Error handling new token", e)
        }
    }
    
    override fun onDeletedMessages() {
        try {
            Log.d(TAG, "Deleted messages on server")
            // Handle case where the FCM server deletes pending messages
        } catch (e: Exception) {
            Log.e(TAG, "Error in onDeletedMessages", e)
        }
    }
}