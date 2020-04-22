var data = {};
const express = require('express')
const app = express()
var restify = require('restify');
var mongoose = require('mongoose');
var articleModel = require('mongoose').model('articleModel');
var http = require('http');
//var url = require('url');
var URL = require('url').URL;
fs = require('fs');

data.executeQuery = function(cursor, queryd,req, res, next,url, callback){
 	var url_data = url.parse(req.url, true);
    var parameter = url_data.query;
    var pages = parameter.page;
    let Projection = {
            _id:1,
            title:1,
            short_title:1,
            summary: 1,
            Published:1,
            genu_res:1,
            sub_channel:1,
            sub_subs:1,
            ArchitectureChannels:1,
            ArchitectureSubs:1,
            PerformanceChannels:1,
            PerformanceSubs:1,
            LifesytlesChannels:1,
            LifesytlesSubs:1,
            FashionChannels:1,
            FashionSubs:1,
            TravelChannels:1,
            TravelSubs:1,
            'files.uploadFiles': 1,
            added_date: 1,
            author_article: 1,
            category_type_article:1,
         }
    var data_query = articleModel.find(queryd, Projection); 
  
    const myCustomLabels = {
        totalDocs: 'itemCount',
        docs: 'itemsList',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount',
        hasPrevPage: 'hasPrev',
        hasNextPage: 'hasNext',
        pagingCounter: 'pageCounter'
    };
    var options = {
          page: Number(pages),
          limit:14,
          pages: 5,
          customLabels: myCustomLabels,
          sort: { added_date: -1 },
         // customLabels: myCustomLabels
        };
	
    articleModel.paginate(data_query,options, function(err, result){
        if (err) {
            return next(new restify.errors.InternalServerError(err));
        } else {
            res.status(200);
            callback({"result":result});
        }
    });
};

module.exports = data;
