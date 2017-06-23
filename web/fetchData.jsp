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
    
    HrDashboardHelper hrHelper = new HrDashboardHelper();
    String responseCount = hrHelper.getResponseCount();
    String wordCA = hrHelper.getWordCloudAssociation();
    String[] sentiment = hrHelper.getSentimentDistribution().split(";");
    String sentimentDist = sentiment[0];
    String sentimentAvg = sentiment[1];
    result.put("responseCount", responseCount);
    result.put("wordCA", wordCA);
    result.put("sentimentDist", sentimentDist);
    result.put("sentimentAvg", sentimentAvg);
    response.setContentType("text/html");
    response.getWriter().println(result);
%>
