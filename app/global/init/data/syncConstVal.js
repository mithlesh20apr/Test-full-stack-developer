/* global __dirname */
var path = require('path');
var cv = require(path.join(__dirname, '..', '..', '..', 'data', 'dbConstValues'));
var Constants = require('mongoose').model('Constants');
var paymentConstants = require('mongoose').model('paymentconstants');
var logger = require(path.join(__dirname, '..', '..', '..', 'service', 'util', 'logger'));
var _ = require('lodash');

module.exports = function() {
    var items = [
        cv.getSexValues(),
        cv.getSpecialValues(),
        cv.getAddressValues(),
        cv.getYearValues(),
        cv.getMonthValues(),
        cv.getLangValues(),
        cv.getSeatValues(),
        cv.getFaqValues(),
        cv.getBoards(),
        cv.getStandards(),
        cv.getClassCategories(),
        cv.getSchoolTutionCategories(),
        cv.getTechnicalTrainingValues(),
        cv.getDegreeLevelCategories(),
        cv.getCompetitiveExamCatories(),
        cv.getCompetitiveExamSubjects(),
        cv.getAdvancedTuitions(),
        cv.getTrainingLevels(),
        cv.getAdvancedTutionItems(),
        cv.getTechnicalTrainings(),
        cv.getBusinessTrainings(),
        cv.getBusinessTechnicalTrainingValues(),
        cv.getPaymentTypes(),
        cv.refundStatus(),
        cv.getCurrencyValues()
    ];

    _.forEach(items, function(item) {
        Constants.findOneAndUpdate({ name: item.name }, { values: item.values }, { upsert: true },
            function(err, result) {
                if (err) {
                    logger.error({
                        logType: 'Error in inserting constant fields',
                        details: {
                            errorDetails: err
                        }
                    });
                }
            });
    });


    //logic for inserting constant payment field
    paymentConstants.findOne({}, function(err, data) {
        if (err) {
            logger.error({
                logType: 'Error in finding constant payment Fields',
                details: {
                    errorDetails: err
                }
            });
        } else {
            //If no constant values are available, then insert default values
            if (!data || data.length == 0) {
                var paymentCont = cv.paymentConstants();

                paymentConstants.create(paymentCont, function(err, result) {
                    if (err) {
                        logger.error({
                            logType: 'Error in inserting constant payment fields',
                            details: {
                                errorDetails: err
                            }
                        });
                    }
                });
            } else {

                //if (!data.hourlyMinFee) {
                data.hourlyMinFee = cv.paymentConstants().hourlyMinFee;
                data.save();
                //}
            }
        }
    });
};