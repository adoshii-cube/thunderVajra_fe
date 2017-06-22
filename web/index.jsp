<%-- 
Document   : index
Created on : 5 May, 2017, 2:19:43 PM
Author     : adoshi
--%>
<%@page import="java.util.List"%>
<%@page import="org.owen.survey.Question"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%--<%@page import="org.owen.survey.QuestionType"%>
<%@page import="org.owen.survey.Question"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.owen.employee.Employee"%>
<%@include file="../common.jsp" %>--%>

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

        <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'>
        <link href="assets/css/styles.css" rel="stylesheet" type="text/css">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

        <link rel='shortcut icon' type='image/x-icon' href='assets/images/OWEN_Favicon.ico'/>

        <!-- Chrome, Firefox OS and Opera -->
        <meta name="theme-color" content="#303f9f">
        <!-- Windows Phone -->
        <meta name="msapplication-navbutton-color" content="#303f9f">
        <!-- iOS Safari -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="#303f9f">
    </head>
    <body>
        <!-- Uses a header that scrolls with the text, rather than staying
          locked at the top -->
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header class="mdl-layout__header mdl-layout__header--waterfall">
                <div class="mdl-layout__header-row">
                    <!-- Title -->
                    <a id="switchUser">
                        <span class="android-title mdl-layout-title">
                            <img class="android-logo-image" src="assets/images/OWEN_Logo_white.png" alt="OWEN Logo">
                        </span>
                    </a>

                    <!-- Add spacer, to align navigation to the right -->
                    <div class="mdl-layout-spacer"></div>
                    <!-- Navigation -->
                    <!--<div class="android-navigation-container">-->
                    <!--<nav class="mdl-navigation">-->
                    <!--<a class="mdl-navigation__link" href="">Link</a>-->
                    <!--</nav>-->
                    <!--</div>-->
                    <!-- Right aligned menu below button -->

                    <button id="switch-role-menu"
                            class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">account_circle</i>
                    </button>

                    <button id="header-menu"
                            class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">more_vert</i>
                    </button>

                    <a>
                        <span class="android-mobile-title mdl-layout-title" id="switchUserMobile">
                            <img class="android-logo-image" src="assets/images/OWEN_Logo_white.png" alt="OWEN Logo">
                        </span>
                    </a>

                </div>
            </header>
            <!--            <div class="mdl-layout__drawer">
                            <span class="mdl-layout-title">
                                <img class="android-logo-image" src="assets/images/OWEN_Logo.png">
                            </span>
                            <nav class="mdl-navigation">
                                <a class="mdl-navigation__link" href="">Link</a>
                            </nav>
                        </div>-->
            <main class="android-content mdl-layout__content">
                <div class="page-content">
                    <!--<div class="android-screen-section mdl-typography--text-center">-->
                    <!--<div class="android-wear-band-text">-->
                    <div class="android-card-container mdl-grid">
                        <!--<div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-card">-->

                            <!--<div class="panelGroup" id="accordion">-->
                                <%
                                    Question qObj = new Question();
                                    List<Question> qList = qObj.getQuestionList();
                                    if (qList.size() == 0) {
                                        response.sendRedirect("thankyou.jsp");
                                    }
                                %>
                                <input type="hidden" id="qListSize" value="<% out.print(qList.size());%>" />


                                <!--<div class="panel">-->
<!--                                    <div class="panelHeading">
                                        <div class="panelTitle sectionOpenText">
                                            <a data-toggle="collapse" href="#three">
                                                <div class="sectionImage"></div>
                                                <div class="section">Section 3</div>
                                                <div class="questionCounter" id="oQuestionCounter">0/<%=qList.size()%></div>
                                            </a>
                                        </div>
                                    </div>-->
                                    <!--<div id="three" class="panel-collapse collapse">-->
                                        <%for (int i = 0; i < qList.size(); i++) {
                                                Question q = qList.get(i);
                                        %>
                                        <!--<div class="mdl-grid">-->
                                            <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-card question" id="oQuestion-<%=q.getQuestionId()%>">
                                                <div class="questionText">
                                                    <h2><%=q.getQuestionText()%></h2>
                                                </div>
                                                <!--                                                <div class="helpText">
                                                                                                    <h5>Some help text here</h5>
                                                                                                </div>-->
                                                <div class="mdl-textfield mdl-js-textfield openTextField">
                                                    <textarea class="mdl-textfield__input openTextResponse" type="text" rows="3" maxrows="6" id="openText-<%=q.getQuestionId()%>" ></textarea>
                                                    <label class="mdl-textfield__label" for="openText"><i>Note: Your responses are <b>confidential</b></i></label>

                                                </div>
                                            </div>

                                        <!--</div>-->
                                        <%}%>
                                    <!--</div>-->
                                <!--</div>-->

                                <!-- end of panel -->
                            <!--</div>-->

                        <!--</div>-->
                    </div>
                    <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone submit">
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" disabled id="submit">
                            <i class="material-icons">check</i>
                            SUBMIT
                        </button>
                        <!--                        <div class="mdl-tooltip mdl-tooltip--large mdl-tooltip--top" for="submit">
                                                    Submit your<br>responses
                                                </div>-->
                    </div>
                </div>
            </main>
        </div>
    </div>
    <script src="assets/js/material.min.js"></script>
    <!--<script src="assets/js/employee/isotope.pkgd.min.js"></script>-->
    <!--<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>-->
    <!--<script src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>-->
    <script src="assets/js/thunder.js"></script>
</body>
</html>
