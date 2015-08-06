/**
 * Created by msd on 15.1.2014.
 */

var messages = exports.messages = {
        'info': new Array(),
        'success': new Array(),
        'warning': new Array(),
        'danger': new Array()
}

var newMessage = exports.newMessage =  function ( title , detail ) {
    return {
        'title': title,
        'detail': detail
    }
}