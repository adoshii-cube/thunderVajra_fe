<%-- 
    Document   : fetchData
    Created on : 14 Jun, 2017, 3:16:38 PM
    Author     : rashmi
--%>


<%@page import="java.util.Map"%>
<%@page import="java.util.List"%>
<%@page import="org.owen.hr.HrDashboardHelper"%>
<%@page import="org.owen.helper.UtilHelper"%>
<%@page import="org.json.JSONObject"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    JSONObject result = new JSONObject();
    
    JSONObject jsonObj = new JSONObject(request.getParameter("jsonObj"));
    int questionId = jsonObj.getInt("quesId");
    
    HrDashboardHelper hrHelper = new HrDashboardHelper();
    String responseCount = hrHelper.getResponseCount(questionId);
    String wordCA = hrHelper.getWordCloudAssociation(questionId);
    String[] sentiment = hrHelper.getSentimentDistribution(questionId).split(";");
    String sentimentDist = sentiment[0];
    String sentimentAvg = sentiment[1];
    result.put("responseCount", responseCount);
    result.put("wordCA", wordCA);
    result.put("sentimentDist", sentimentDist);
    result.put("sentimentAvg", sentimentAvg);
    response.setContentType("text/html");
    response.getWriter().println(result);
%>
