var bigdata1 = function() {
    return {
        "testName": "BigData in Amazon Web Servics",
        "question": [{
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">In the recent years, the most appropriate reasons behind the popularity of big data are</span></p>",
                "questionNo": 0,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">Web economy, hardware cost reduction and open source eco-system</span></p>",
                    "optionIndex": "4"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Socio Economic growth</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Higher number of population</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Cheaper Hardware and increasing number of smart phones</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Web economy, hardware cost reduction and open source eco-system</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">____________ service doesn&apos;t fit well when the data structure is unknown.</span></p>",
                "questionNo": 1,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">MariaDB</span></p>\n<p><span style=\"font-size: 12pt;\"><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/maria.JPG\" alt=\"\" width=\"181\" height=\"92\" /></span></p>",
                    "optionIndex": "2"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Elastic Map Reduce (EMR)</span></p>\n<p><span style=\"font-size: 12pt;\"><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/emr.JPG\" alt=\"\" width=\"127\" height=\"129\" /></span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">MariaDB</span></p>\n<p><span style=\"font-size: 12pt;\"><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/maria.JPG\" alt=\"\" width=\"181\" height=\"92\" /></span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Redshift</span></p>\n<p><span style=\"font-size: 12pt;\"><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/redshift.JPG\" alt=\"https://d3a3sqa41afhfp.cloudfront.net/general/redshift.JPG\" width=\"137\" height=\"120\" /></span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Simple Storage Service (S3)</span></p>\n<p><span style=\"font-size: 12pt;\"><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/s3.JPG\" alt=\"\" width=\"166\" height=\"202\" /></span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">During parallel batch processing between multiple Redshift nodes, what is the most convenient way to move data around?</span></p>",
                "questionNo": 2,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">Connect different data base nodes with Data Pipeline.</span></p>",
                    "optionIndex": "3"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Use Lambda triggers and S3 storage for transferring data.&nbsp;</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Use AWS Elastic File System cluster with high frequency read/write.</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Connect different data base nodes with Data Pipeline.</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Use cluster of EC2 machines and transfer through socket channels.</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">While configuring EMR cluster, the following object does __________________</span></p>\n<pre class=\"programlisting\"><code class=\"nohighlight\">{\n  &quot;id&quot; : &quot;ClusterId&quot;,\n  &quot;type&quot; : &quot;EMRCluster&quot;,\n  &quot;hadoopVersion&quot; : &quot;0.20&quot;,\n  &quot;keyPair&quot; : &quot;aws-key-pair&quot;,\n  &quot;masterInstanceType&quot; : &quot;m3.xlarge&quot;,\n  &quot;coreInstanceType&quot; : &quot;m3.xlarge&quot;,\n  &quot;coreInstanceCount&quot; : &quot;10&quot;,\n  &quot;taskInstanceType&quot; : &quot;m3.xlarge&quot;,\n  &quot;taskInstanceCount&quot;: &quot;10&quot;,\n  &quot;bootstrapAction&quot; : [&quot;s3://<em class=\"replaceable\"><code class=\"\">Region</code></em>.elasticmapreduce/bootstrap-actions/configure-hadoop,arg1,arg2,arg3&quot;,<br>         &quot;s3://<em class=\"replaceable\"><code class=\"\">Region</code></em>.elasticmapreduce/bootstrap-actions/configure-hadoop/configure-other-stuff,arg1,arg2&quot;]\n}</code></pre>\n<p>&#xA0;</p>",
                "questionNo": 3,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">Create an EMR cluster with Hadoop version 0.20</span></p>\n<p><span style=\"font-size: 12pt;\">Allocate the master/task node 10 and 10 respectively &nbsp;</span></p>",
                    "optionIndex": "3"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Reset an EMR cluster with Hadoop version 0.20</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Create an EMR cluster with Hadoop version 0.20 </span></p>\n<p><span style=\"font-size: 12pt;\">The master/child node capacity 1:1 and the max node count 10&nbsp;</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Create an EMR cluster with Hadoop version 0.20</span></p>\n<p><span style=\"font-size: 12pt;\">Allocate the master/task node 10 and 10 respectively &nbsp;</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Reading EMR/Hadoop configuration file from a S3 bucket</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">In a Data-Pipeline how do you handle dependent object state failures.</span></p>",
                "questionNo": 4,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt; font-family: verdana, geneva, sans-serif;\"><code class=\"code\">With 'failureAndRerunMode' set to cascade</code></span></p>",
                    "optionIndex": "3"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Reset the Data-Pipeline</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">With 'failureAndRerunMode' set to none</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt; font-family: verdana, geneva, sans-serif;\"><code class=\"code\">With 'failureAndRerunMode' set to cascade</code></span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Reinitialize the dependent object state</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">In EMR/Hadoop cluster, how does the Hive layer communicate with the Hadoop Distributed File System.</span></p>",
                "questionNo": 5,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">MapReduce stack</span></p>",
                    "optionIndex": "4"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Pig Latin Script</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">ODBC Driver</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Staging Table Storage</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">MapReduce stack</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">What is the correct workflow in the AWS Kinesis architecture?</span></p>",
                "questionNo": 6,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/kinesis4.JPG\" alt=\"https://d3a3sqa41afhfp.cloudfront.net/general/kinesis4.JPG\" width=\"196\" height=\"166\" /></p>",
                    "optionIndex": "4"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/kinesis1.JPG\" alt=\"\" width=\"196\" height=\"166\" /></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/kinesis2.JPG\" alt=\"\" width=\"196\" height=\"166\" /></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/kinesis3.JPG\" alt=\"\" width=\"196\" height=\"166\" /></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/kinesis4.JPG\" alt=\"https://d3a3sqa41afhfp.cloudfront.net/general/kinesis4.JPG\" width=\"196\" height=\"166\" /></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">Which of the following is the common characteristic between a MapReduce cluster and Massive Parallel Processing (Data Warehouse)</span></p>",
                "questionNo": 7,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">Split up the primary query into multiple sub-queries and distribute over multiple cluster nodes</span></p>",
                    "optionIndex": "2"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Similar data cleansing/reduce step</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Split up the primary query into multiple sub-queries and distribute over multiple cluster nodes</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Directly attached storage</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Failover and recovery process</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">In arbitary data analysis, how DynamoDB plays a crucial role to form&#xA0;structured datasets from unstructured input.&#xA0;</span></p>",
                "questionNo": 8,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">DynamoDB key/value paris can be used as an hash-table and each key can be transformed to a corresponding column in an RDS instance like Redshift.</span></p>",
                    "optionIndex": "2"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Continuous reindexing in DynamoDB convert unstructured data into structural format.</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">DynamoDB key/value paris can be used as an hash-table and each key can be transformed to a corresponding column in an RDS instance like Redshift.</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">DynamoDB parent/child key/value pairs can be auto adjusted to partition related datasets.</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">None of the above</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">While considering abstraction layers, AWS EMR cluster replaces ____________ with _________ from the typical Hadoop Cluster stack.</span></p>",
                "questionNo": 9,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">Sqoop, Impala</span></p>",
                    "optionIndex": "3"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Mahout , Sqoop</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Pig Latin, Hive</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Sqoop, Impala</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Hive, Impala</span></p>",
                        "optionIndex": "4"
                    }
                ]
            }
        ],
        "totalDuration": 10,
        "totalMarks": 10,
        "averageTime": 7,
        "bestTime": 2,
        "averageMarks": 7,
        "bestMarks": 10
    };
}

exports.bigdata1 = bigdata1;

var bigdata2 = function() {
    return {
        "testName": "Machine Learning and BigData",
        "question": [{
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">Among the following points, which one is not a characteristic of machine learning?</span></p>",
                "questionNo": 0,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">Repeated remodeling of patters to align with unstructured datasets.</span></p>",
                    "optionIndex": "3"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Finding Patterns in Data.</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Creating graphical models from pattern matching algorithms.</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Repeated remodeling of patters to align with unstructured datasets.</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Predictive analysis.</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p>&#xA0;</p>\n<p><span style=\"font-size: 12pt;\">Select two missing process steps in the machine learning process</span></p>\n<p>&#xA0;</p>\n<p><img src=\"https://d3a3sqa41afhfp.cloudfront.net/general/ml1.JPG\" alt=\"\" width=\"441\" height=\"176\"></p>",
                "questionNo": 1,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">ML Algorithm, Chosen Model</span></p>",
                    "optionIndex": "2"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Post-processed Data, Chosen Model</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">ML Algorithm, Chosen Model</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Apply Processed Data, ML Algorithm</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Raw Data Reverse order, ML Algorithm</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">How does machine learning process helps, when decision has to be made through real-time data processing?</span></p>",
                "questionNo": 2,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">Predictive Models, created with Historical Data</span></p>",
                    "optionIndex": "4"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Superfast big data processing tool, such as Hadoop/Spark&nbsp;</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Massive parallel computing</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Not possible in real-time</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Predictive Models, created with Historical Data</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">What are these two ML process steps are iterative?</span></p>",
                "questionNo": 3,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">Prepare Structured Data from Raw Data</span></p>\n<p><span style=\"font-size: 12pt;\"> ML Algorithm to find Predictive Model</span></p>",
                    "optionIndex": "1"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Prepare Structured Data from Raw Data</span></p>\n<p><span style=\"font-size: 12pt;\"> ML Algorithm to find Predictive Model</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Raw data-set selection</span></p>\n<p><span style=\"font-size: 12pt;\">ML Algorithm to generate Candidate Model</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Prepared data processing&nbsp;</span></p>\n<p><span style=\"font-size: 12pt;\">Chosen Model selection</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">ML Process steps are mostly linear</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">What is traning data in ML?</span></p>",
                "questionNo": 4,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">Processed data that creates predictive model.</span></p>",
                    "optionIndex": "4"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Data that's used to train ML professionals.</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Reverse Engineering from prepared data to raw data.</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Model data that is consumed by client applications.</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Processed data that creates predictive model.</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">Which of the following example(s) fall under supervised learning</span></p>\n<ol>\n<li><span style=\"font-size: 12pt;\">Credit card fraud detection.</span></li>\n<li><span style=\"font-size: 12pt;\">Face feature prediction of an unknown person.</span></li>\n<li><span style=\"font-size: 12pt;\">Percentage of people earns more than $5000 per month, in an unknown city.&#xA0;</span></li>\n<li><span style=\"font-size: 12pt;\">Next month product sell forcast.</span></li>\n</ol>\n<p>&#xA0;</p>",
                "questionNo": 5,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">1, 4</span></p>",
                    "optionIndex": "4"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">2</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">1, 2, 3</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">1, 3</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">1, 4</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">Which one of the following is a true statement?</span></p>",
                "questionNo": 6,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">All the above</span></p>",
                    "optionIndex": "4"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Classification and Regression are two categories of ML</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">In ML target values are created from processed data features</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Clustering is used in unsupervised learning</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">All the above</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">Which of the following type of algorithm is used in Clustering category?</span></p>",
                "questionNo": 7,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">K-means</span></p>",
                    "optionIndex": "3"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Bayesian</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Decision Tree</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">K-means</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Neural Network</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">R language and enviroment helps with ________________</span></p>",
                "questionNo": 8,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">All of the above</span></p>",
                    "optionIndex": "4"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">Data import and export from file systems</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Maintain internal data consistency</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">Grouping and Ordering of data</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">All of the above</span></p>",
                        "optionIndex": "4"
                    }
                ]
            },
            {
                "duration": 1,
                "marks": 1,
                "hints": "",
                "question": "<p><span style=\"font-size: 12pt;\">Which of these syntax in R allows chain of commands?&#xA0;</span></p>",
                "questionNo": 9,
                "questionType": "sa",
                "autoEvalAns": [{
                    "value": "<p><span style=\"font-size: 12pt;\">%&gt;%</span></p>",
                    "optionIndex": "2"
                }],
                "attachments": [],
                "options": [{
                        "value": "<p><span style=\"font-size: 12pt;\">++</span></p>",
                        "optionIndex": "1"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">%&gt;%</span></p>",
                        "optionIndex": "2"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">&lt; -&nbsp;</span></p>",
                        "optionIndex": "3"
                    },
                    {
                        "value": "<p><span style=\"font-size: 12pt;\">.||</span></p>",
                        "optionIndex": "4"
                    }
                ]
            }
        ],
        "totalDuration": 10,
        "totalMarks": 10,
        "averageTime": 8,
        "bestTime": 6,
        "averageMarks": 8,
        "bestMarks": 10
    };
}

exports.bigdata2 = bigdata2;