var MS_ROLLING_HEALTH = 750;
function CRollingHealth() {

    var _oTweenText = null;
    var _oTweenTextStroke = null;

    this.rolling = function (_oTextTime, _oTextTimeStruct, _iHealth) {
        
        if(_iHealth > parseInt(_oTextTime.text)){
            _oTextTime.color = "#fff"
        }else if(_iHealth < parseInt(_oTextTime.text)){
            _oTextTime.color = "#ae0000"
        }
        
        _oTweenText = createjs.Tween.get(_oTextTime).to({text: _iHealth}, MS_ROLLING_SCORE, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.removeTweens(_oTweenText);
            _oTextTime.color = "#fff";
        }).addEventListener("change", function () {
            _oTextTime.text = Math.floor(_oTextTime.text);
        })

        if (_oTextTimeStruct !== null) {
            _oTweenTextStroke = createjs.Tween.get(_oTextTimeStruct).to({text: _iHealth}, MS_ROLLING_SCORE, createjs.Ease.cubicOut).call(function () {
                createjs.Tween.removeTweens(_oTweenTextStroke);
            }).addEventListener("change", function () {
                _oTextTimeStruct.text = Math.floor(_oTextTimeStruct.text);
            })

        }
    };

    return this;
}

