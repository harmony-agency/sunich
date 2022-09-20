function CInterface(){

    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oAudioToggle;
    var _oButFullscreen;
    var _oButExit;
    var _oButLeft;
    var _oButRight;
    var _oButHelp;
    var _oGUIExpandible;
    var _oContainerTime;
    var _oContainerScore;
    var _oContainerBestScore;
    var _oRollingScore;
    var _oRollingHealth;
    var _oTextTime;
    var _oTextHealth;

    var _oTextScore;
    var _oTextBestScore;

    var _pStartPosScore;
    var _pStartPosBestScore;
    var _pStartPosTime;
    var _pStartPosLeft;
    var _pStartPosRight;
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    
    
    this._init = function(){  
        //SCORE CONTAINER
        _pStartPosScore = {x:10,y:10};
        _oContainerScore = new createjs.Container();
        _oContainerScore.x = _pStartPosScore.x;
        _oContainerScore.y = _pStartPosScore.y;
        s_oStage.addChild(_oContainerScore);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("score_panel");
        var oBgScore = createBitmap(oSpriteBg);
        _oContainerScore.addChild(oBgScore);
        
        _oTextScore = new CTLText(_oContainerScore, 
                    84, 24, 160, 54, 
                    54, "left", "#fff", FONT, 1,
                    0, 0,
                    "0",
                    true, true, false,
                    false );

        
        
        //BEST SCORE CONTAINER
        _pStartPosBestScore = {x:10,y:oSpriteBg.height+10};
        _oContainerBestScore = new createjs.Container();
        _oContainerBestScore.x = _pStartPosBestScore.x;
        _oContainerBestScore.y = _pStartPosBestScore.y;
        s_oStage.addChild(_oContainerBestScore);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("best_score_panel");
        var oBgScore = createBitmap(oSpriteBg);
        _oContainerBestScore.addChild(oBgScore);
        
        _oTextBestScore = new CTLText(_oContainerBestScore, 
                    84, 24, 160, 54, 
                    54, "left", "#fff", FONT, 1,
                    0, 0,
                    "0",
                    true, true, false,
                    false );
                    

        
        
        
        //TIME CONTAINER
        _pStartPosTime = {x:10,y:_oContainerBestScore.y + oSpriteBg.height};
        _oContainerTime = new createjs.Container();
        _oContainerTime.x = _pStartPosTime.x;
        _oContainerTime.y = _pStartPosTime.y;
        s_oStage.addChild(_oContainerTime);
        
        var oBgTime = createBitmap(s_oSpriteLibrary.getSprite("time_panel"));
        _oContainerTime.addChild(oBgTime);
        
        _oTextTime = new CTLText(_oContainerTime, 
                    84, 30, 160, 40, 
                    40, "left", "#fff", FONT, 1,
                    0, 0,
                    HEALTH,
                    true, true, false,
                    false );

        
        
        
        
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)-10, y: (oSprite.height/2)+10 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _oButExit.getX() - oSprite.width/2 -10, y: (oSprite.height/2)+10 };
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
            
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = {x: _pStartPosAudio.x - oSprite.width/2 - 10,y:(oSprite.height/2) + 10};
        }else{
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = {x: _oButExit.getX() - oSprite.width/2 -10, y: (oSprite.height/2)+10 };
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.enabled){            
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        } 

        
        _oButHelp = new CGfxButton(100,100,s_oSpriteLibrary.getSprite("but_help"),s_oStage);
        _oButHelp.addEventListener(ON_MOUSE_UP,this._onHelp,this);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        _oGUIExpandible = new CGUIExpandible(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oGUIExpandible.addButton(_oButExit);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oGUIExpandible.addButton(_oAudioToggle);
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oGUIExpandible.addButton(_oButFullscreen);
        }
        
        _oGUIExpandible.addButton(_oButHelp);
        
        
        
        _oRollingScore = new CRollingScore();

        _oRollingHealth = new CRollingHealth();

        
        
        if(!s_bMobile) {
            //KEY LISTENER
            document.onkeydown   = s_oGame.onKeyDown;
            document.onkeyup   = s_oGame.onKeyUp;
        }else{
            var oSpriteLeft = s_oSpriteLibrary.getSprite("but_left");
            _pStartPosLeft = {x:oSpriteLeft.width/2 + 50,y:CANVAS_HEIGHT-oSpriteLeft.height/2 -20};
            _oButLeft = new CGfxButton(_pStartPosLeft.x,_pStartPosLeft.y,oSpriteLeft,s_oStage);
            _oButLeft.addEventListener(ON_MOUSE_DOWN,this._onLeftDown,this);
            _oButLeft.addEventListener(ON_MOUSE_UP,this._onLeftUp,this);
            
            var oSpriteRight = s_oSpriteLibrary.getSprite("but_right");
            _pStartPosRight = {x:CANVAS_WIDTH - oSpriteRight.width/2 - 50,y:CANVAS_HEIGHT-oSpriteRight.height/2 -20};
            _oButRight = new CGfxButton(_pStartPosRight.x,_pStartPosRight.y,oSpriteRight,s_oStage);
            _oButRight.addEventListener(ON_MOUSE_DOWN,this._onRightDown,this);
            _oButRight.addEventListener(ON_MOUSE_UP,this._onRightUp,this);
        }
    };
    
    this.unload = function(){
        _oGUIExpandible.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.enabled){
                _oButFullscreen.unload();
        }
        
        if(!s_bMobile) {
            //KEY LISTENER
            document.onkeydown   = null;
            document.onkeyup   = null;
        }else{
            _oButLeft.unload();
            _oButRight.unload();
        }
        
        _oButExit.unload();

        s_oInterface = null;
    };
        
    this.refreshButtonPos = function(){
        _oGUIExpandible.refreshPos();
        
        _oContainerTime.x = _pStartPosTime.x + s_iOffsetX;
        _oContainerTime.y = _pStartPosTime.y + s_iOffsetY;
        
        _oContainerScore.x = _pStartPosScore.x + s_iOffsetX;
        _oContainerScore.y = _pStartPosScore.y + s_iOffsetY;
        
        _oContainerBestScore.x = _pStartPosBestScore.x + s_iOffsetX;
        _oContainerBestScore.y = _pStartPosBestScore.y + s_iOffsetY;
        
        if(s_bMobile){
            _oButLeft.setPosition(_pStartPosLeft.x + s_iOffsetX,_pStartPosLeft.y - s_iOffsetY);
            _oButRight.setPosition(_pStartPosRight.x - s_iOffsetX,_pStartPosRight.y - s_iOffsetY);
        }
    };
    
    this.reset = function(iScore){
        this.refreshTime(HEALTH);
        this.refreshScore(iScore);
        _oGUIExpandible.reset();
    };

    this.refreshTime = function(iTime){
        _oTextTime.refreshText(iTime);
    };
    
    this.refreshScore = function(iScore){
        _oRollingScore.rolling(_oTextScore.getText(), null, iScore);
    };
    
    this.refreshHealth = function(_iHealth){
        _oRollingHealth.rolling(_oTextTime.getText(), null, _iHealth);
    };

    this.refreshBestScore = function(){
        _oTextBestScore.refreshText(s_iBestScore);
    };
    
    this.collapseGUIButtons = function(){
        _oGUIExpandible._onMenu();
    };
    
    this._onLeftDown = function(){
        s_oGame.moveLeft(true);
    };
    
    this._onRightDown = function(){
        s_oGame.moveRight(true);
    };
    
    this._onLeftUp = function(){
        s_oGame.moveLeft(false);
    };
    
    this._onRightUp = function(){
        s_oGame.moveRight(false);
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        s_oGame.onExit();
    };
    
    this._onHelp = function(){
        s_oGame.showHelpPanel();
    };
    
    this.resetFullscreenBut = function(){
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };
        
    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;