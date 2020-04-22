exports.getSummary = function(classId) {
    return {
        classId: classId,
        title: classId + 'test',
        subject: 'Mathematics',
        language: 'English',
        classDescription: 'This is a test class',
        fee: getRandom(1, 100),
        totalSeat: getRandom(1, 100)
    };
};

exports.getPicture = function(classId) {
    return {
        classId: classId,
        pictureName: 'test' + classId + '.png'
    };
};

exports.getSyllabus = function(classId) {
    return {
        classId: classId,
        syllabus: 'Everything is included.'
    }
};

exports.getNotice = function(classId) {
    return {
        classId: classId,
        title: 'Test notice title',
        content: 'This is a test notice'
    }
};

exports.getUpdatedNotice = function(classId, noticeId) {
    return {
        classId: classId,
        noticeId: noticeId,
        title: 'Test notice updated title',
        content: 'This is a test notice'
    }
};

exports.getNewFAQ = function(classId) {
    return {
        classId: classId,
        question: classId + 'A Question',
        answer: classId + ' An Answer'
    }
};

exports.getUpdatedFAQ = function(classId, faq) {
    return {
        classId: classId,
        faqId: faq._id,
        question: classId + 'A New Question',
        answer: classId + 'Another Answer'
    }
};

exports.getAssignedTest = function(classId, testId) {
    return {
        classId: classId,
        testId: testId,
        testName: 'Test 790',
        testStartDateTime: new Date(Date.now()),
        testEndDateTime: new Date(Date.now()),
        testType: 'Exam'
    }
};

exports.getFeedback = function(classId) {
    return {
        classId: classId,
        isNew: true,
        feedback: {
            comment: 'Great Stuff!',
            communication: '7',
            knowledge: '10',
            material: '4',
            method: '9'
        }
    }
};

exports.getTeacherRemark = function(classId,studentId) {
    return {
        classId: classId,
        studentId: studentId,
        remarkDetails: 'Yippeee!!'
    }
};


var getRandom = function(min,max){
	if(max == undefined)
		return Math.floor(Math.random() * (min + 1));
	else
		return Math.floor(Math.random() * (max - min + 1) + min);
}