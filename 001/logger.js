function showLogMessage(msg){
    console.log('로그메시지는'+msg);
}

module.exports.special_showLogMessage=showLogMessage
//showLogMessage 함수를 외부에서 사용
//special_showLogMessage로 사용하게됨

