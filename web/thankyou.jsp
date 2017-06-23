<%-- 
    Document   : thankyou
    Created on : 11 May, 2017, 11:55:59 PM
    Author     : adoshi
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>OWEN Analytics - AI driven people solutions</title>

        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
        <meta content="IE=11;IE=Edge" http-equiv="X-UA-Compatible">
        <meta charset="utf-8">

        <link href="assets/css/material.min.css" rel="stylesheet" type="text/css">
        <!--<link href="assets/css/materialdesignicons.css" media="all" rel="stylesheet" type="text/css" />-->
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link href="assets/css/thunder.css" rel="stylesheet" type="text/css">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

        <link rel='shortcut icon' type='image/x-icon' href='assets/images/OWEN_Favicon.ico'/>

        <!-- Chrome, Firefox OS and Opera -->
        <meta name="theme-color" content="#010101">
        <!-- Windows Phone -->
        <meta name="msapplication-navbutton-color" content="#010101">
        <!-- iOS Safari -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="#010101">
    </head>
    <body>
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header class="mdl-layout__header mdl-layout__header--waterfall">
                <div class="mdl-layout__header-row">
                    <!-- Title -->
                    <a id="switchUser">
                        <span class="android-title mdl-layout-title">
                            <img class="LT-logo-image" src="assets/images/L&T_Logo.jpg" alt="L&T Logo">
                        </span>
                    </a>
                    <div class="mdl-layout-spacer"></div>
                    <a id="switchUser">
                        <span class="android-title mdl-layout-title">
                            <img class="thunder-logo-image" src="assets/images/Thunder_Logo.jpg" alt="Thunder Logo">
                        </span>
                    </a>

                    <!-- Add spacer, to align navigation to the right -->
                    <!--<div class="mdl-layout-spacer"></div>-->
                    <!-- Navigation -->
                    <!--<div class="android-navigation-container">-->
                    <!--<nav class="mdl-navigation">-->
                    <!--<a class="mdl-navigation__link" href="">Link</a>-->
                    <!--</nav>-->
                    <!--</div>-->
                    <!-- Right aligned menu below button -->

<!--                    <button id="switch-role-menu"
                            class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">account_circle</i>
                    </button>

                    <button id="header-menu"
                            class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">more_vert</i>
                    </button>-->

                    <a>
                        <span class="android-mobile-title mdl-layout-title" id="switchUserMobile">
                            <img class="thunder-logo-image" src="assets/images/Thunder_Logo.jpg" alt="L&T Logo">
                        </span>
                    </a>

                </div>
            </header>
            <main class="android-content mdl-layout__content">
                <div class="page-content">
                    <div class="android-card-container mdl-grid thankyou">
                        <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-card">
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-card image"></div>
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-card">
                                <h2>All done here</h2>
                            </div>
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-card">
                                You are a rockstar. Thank you for taking the survey.
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
        <script src="assets/js/material.min.js"></script>
    </body>
</html>
