/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var bgGeo = window.plugins.backgroundGeoLocation;
        app.receivedEvent('deviceready');

        //we add this so the app asks for permission
        window.navigator.geolocation.getCurrentPosition(function(location) {
            console.log('Location from Phonegap');
            alert("got current loc!");
            alert(JSON.stringify(location));

            var ios_callbackFn = function () {
                alert("ios!!!");
            };

            var failureFn = function () {
                alert("fail!!!");
            };

            bgGeo.configure(ios_callbackFn, failureFn, {
                url: 'http://requestb.in/1bodkx21',
                params: {
                    auth_token: 'user_secret_auth_token',
                    foo: 'bar'
                },
                headers: {
                    "X-Foo": "BAR"
                },
                desiredAccuracy: 10,
                stationaryRadius: 20,
                distanceFilter: 30,
                notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
                notificationText: 'ENABLED', // <-- android only, customize the text of the notification
                activityType: 'AutomotiveNavigation',
                debug: false // <-- enable this hear sounds for background-geolocation life-cycle.
            });

            alert("bgGeo configured!");

            bgGeo.start();
            alert("bgGeo started!");

        });


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
