/* global __dirname */
var path = require('path');
var jwt = require(path.join(__dirname, '..', '..', 'app', 'service', 'auth', 'jwt'));
var envConfig = require(path.join(__dirname, '..', '..', 'app', 'global', 'config', 'appConfig'));

exports.getTestTeacher = function (userNameSeed) {
    return {
        firstName: 'Kelly',
        lastName: 'Cuoco',
        userName: 'kelly.cuoco' + userNameSeed + '@mail.com',
        passwd: 'q1w2e3r4T5',
        passwd2: 'q1w2e3r4T5',
        userRole: 'teacher',
        phoneNo: '9090909090'
    };
}

exports.getTestTeacherProfile = function() {
    return {    
        firstName:'q',
        lastName:'q',
        active: 'true',
        pictureName: '',
        sex:'Female',
        summary:'esdfsdfsdfsdfsdfsd',
        dob:'1972-03-17T19:11:00.000Z'
    };
}

exports.getTestStudentProfile = function() {
    return {    
        firstName:'q',
        lastName:'q',
        active: 'true',
        pictureName: '',
        sex:'Female',
        summary:'esdfsdfsdfsdfsdfsd',
        dob:'1972-03-17T19:11:00.000Z'
    };
}


exports.getTestTeacherQualification = function() {
    var x = 
    [
        {
            degree:'BE',
            specialization:'IT',
            marks:'50',
            year:'1991',
            'institution': 'test university'
        },
        {
            degree:'ME',
            specialization:'sw engg',
            marks:'45',
            year:'1992',
            'institution': 'test university2'
        }   
    ];
    
    return x;
   
}
exports.getTestStudentQualification = function() {
    var x = 
    [
        {
            degree:'BE',
            specialization:'IT',
            marks:'50',
            year:'1991',
            'institution': 'test university'
        },
        {
            degree:'ME',
            specialization:'sw engg',
            marks:'45',
            year:'1992',
            'institution': 'test university'
        }   
    ];
    
    return x;
   
}
exports.getTestTeacherExperience = function () {
    
    var x =   
        [
            {
            jobtype:'f',
            organization:'g',
            jobdesignation:'h',
            startmonth:'Jan',
            startyear:'2011',
            ongoing:false,
            endmonth:'Feb',
            endyear:'2011',
            jobdetails:'i'
            },
            {
            jobtype:'f1',
            organization:'g1',
            jobdesignation:'h1',
            startmonth:'Jan',
            startyear:'2011',
            ongoing:true,
            endmonth:'',
            endyear:null,
            jobdetails:'i1'
            }
        ];
    
    return x;
}

exports.getTestTeacherTraining = function () {
    
    var x =   
        [
            {
            training_name:'f1',
            training_details:'g1',
            },
            {
            training_name:'f2',
            training_details:'g2',
            }
        ];
    
    return x;
}

exports.getTestTeacherCertification = function () {
    
    var x =   
        [
            {
            certification_name:'f1',
            certification_details:'g1',
            },
            {
            certification_name:'f2',
            certification_details:'g2',
            }
        ];
    
    return x;
}

exports.getTestTeacherAwards = function () {
    
    var x =   
        [
            {
            awards_name:'f1',
            awards_details:'g1',
            },
            {
            awards_name:'f2',
            awards_details:'g2',
            }
        ];
    
    return x;
}

exports.getTestTeacherResearch = function () {
    
    var x =   
        [
            {
            research_name:'f1',
            research_details:'g1',
            },
            {
            research_name:'f2',
            research_details:'g2',
            }
        ];
    
    return x;
}

exports.getTestTeacherPublication = function () {
    
    var x =   
        [
            {
            publication_name:'f1',
            publication_details:'g1',
            },
            {
            publication_name:'f2',
            publication_details:'g2',
            }
        ];
    
    return x;
}

exports.getTestTeacherContacts = function () {
    
    var x = {
        phoneNo: "9876543215",
        address: {
            address1: "41",
            address2: "42",
            country: "India",
            state: "West Bengal",
            city: "Kolkata",
            pin: "700020"
        }
    };
    
    return x;
}
exports.getTestStudentContacts = function () {
    
    var x = {
        phoneNo: "9876543216",
        address: {
            address1: "41",
            address2: "42",
            country: "India",
            state: "West Bengal",
            city: "Kolkata",
            pin: "700020"
        }
    };
    
    return x;
}

exports.getTestStudent = function (userNameSeed) {
    return {
        firstName: 'Jim',
        lastName: 'Parsons',
        userName: 'jim.parsons' + userNameSeed + '@mail.com',
        passwd: 'q1w2e3r4T5',
        passwd2: 'q1w2e3r4T5',
        userRole: 'student',
        phoneNo: '9090909091'
    };
}
exports.getTestPasswdChange = function () {
    return {
        passwdold: 'q1w2e3r4T5',
        passwdnew: 'qweRTY*123',
        passwdnew2: 'qweRTY*123',
    };
}
exports.getSampleTest = function () {
    return {
        name: 'Test 790',
        testFormat: 'Wizard',
        testType: 'Exam',
        totalMarks: 90,
        totalDuration: 90,
        noOfAttempts: 1
    };
};

exports.getSampleUpdateTest = function () {
    return {
        name: 'Test 791',
        totalMarks: 91,
        totalDuration: 91,
        noOfAttempts: 1
    };
};

exports.getSampleQuestion = function (qsno) {
    return {
        testId: '',
        question: {
            _id: "",
            questionType: "sa",
            questionNo: qsno,
            question: "Click and enter the question.",
            hints: "",
            attachmentNames: [
                {
                    name: "Chrysanthemum.jpg",
                    caption: "Qn3"
                }],
            noteFiles: ["SRSExample-webapp.doc"],
            options: [
                {
                    optionIndex: 1,
                    value: "Choice 1"
                },
                {
                    optionIndex: 2,
                    value: "Choice 2"
                },
                {
                    optionIndex: 3,
                    value: "Choice 3"
                },
                {
                    optionIndex: 4,
                    value: "Choice 4"
                }],
            externalRefs: "",
            marks: "10",
            duration: "10",
            audioFile: "Katy PerryLast Friday Night.mp3",
            hasUnsavedChanges: true,
            autoEvalAns: [
                {
                    optionIndex: 2,
                    value: "Choice 2"
                }]
        }
    };
};


exports.getSampleQuestionPlain = function (qsno) {
    return {
        testId: '',
        testFormat: 'Plain',
        question: {
            _id: "",
            questionType: "la",
            questionNo: qsno,
            question: "Click and enter the question.",
            hints: "",
            attachmentNames: [
                {
                    name: "Chrysanthemum.jpg",
                    caption: "Qn2"
                }],
            noteFiles: ["SRSExample-webapp.doc"],
            externalRefs: "",
            marks: "10",
            audioFile: "Katy PerryLast Friday Night.mp3",
            }
    };
};

exports.getSampleAnswer = function(testId, classId, ansId){
  return  {
        testId: testId,
        classId: classId,
        answer:{
            _id:"",
            questionNo:0,
            question: 'Click and enter the question.',
            questionType: 'sa',
            answerOptions:[
            { optionIndex:"1", value: "Choice 1", isSelected: true },
            { optionIndex:"2", value:"Choice 2", isSelected: false },
            { optionIndex:"3", value:"Choice 3", isSelected:false},
            { optionIndex:"4", value:"Choice  4", isSelected:false}],
            textAns:"" 
            },
        ansId: ansId,
        isFinalSubmission: true,
        stat:{ questionNo: 0, selfNote: "",timeTaken: 23000 }
    };
};

exports.getSampleEvaluatedResult = function(testId, classId, studentId, studentAnsId){
  return  {
      testId: testId,
      classId: classId,
      studentId: studentId,
      submittedTestAnsId: studentAnsId,
      testEvaluation:{
          _id: '',
          questionNo:0,
          question:"Click and enter the question.",
          answerOptions:[
              { optionIndex:1, value: "Choice 1", isSelected:true },
              { optionIndex:2, value: "Choice 2", isSelected:false },
              { optionIndex:3, value: "Choice 3", isSelected:false },
              { optionIndex:4, value: "Choice 4", isSelected:false }
              ],
          questionType: 'sa',
          textAns:'',
          totalMarks: '10',
          marks: '10',
          comment: 'asdfasdfasdfasdfasd',
          timeTaken: 3,
          ansLevel:{ 
              isCorrect:false,
              isWrong:false,
              isPartiallyCorrect:false
              }
          }
     };
};

exports.getSampleClass = function(uid){
    var startDate = new Date();    
    var endDate = new Date();
    endDate.setDate(startDate.getDate() +3);
    return {        
        createClassData: {
            title:"fall math class"+uid+getRandom(0,100000),
            classStartDate: startDate,
            classEndDate: endDate,
            fee:1000,
            classDescription: "class description",                    
            language:"English",
            category:"College Tuition",
            categoryItem1:"Bachelor",
            categoryItem2:"Business Study",
            categoryItem3:"Accountancy",
            schedule:"123",           
            syllabus: ' mock syllabus',
            paymentType: 'One Time'
        }
    };
};

exports.getEncodedUserId = function (userId) {
    return jwt.encodeToken({ userId: userId }, envConfig.SECRECT_JWT_TOKEN_KEY);
}

exports.createToken = function (userId, userRole, next) {
    return jwt.createToken({ id: userId, userRole: userRole }, function (err, token) {
        next(token);
    });
};
var getRandom = function(min,max){
	if(max == undefined)
		return Math.floor(Math.random() * (min + 1));
	else
		return Math.floor(Math.random() * (max - min + 1) + min);
}
