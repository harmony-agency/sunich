function CGame(){
    var _bUpdate;
    var _bLogoOn;
    var _bKeyDown;
    var _bGameOver;
    var _iScore;   
    var _iTimeElapsLogo;
    var _iTimeElapsSpawn;
    var _iTimeElaps;
    var _iHealth;
    var _iCurSpawnTime;
    var _aItems;
    var _aItemsToRemove;
    
    var _oHero;
    var _oReadyGoAnim;
    var _oGameLogo;
    var _oContainerBg;
    var _oContainerHero;
    var _oContainerFg;
   
    var _oInterface;
    var _oHelpPanel;
    var _oAreYouSurePanel;
   
    var _oGameOverPanel;
    var _oDebug;
    
    this._init = function(){
        setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME);   
        _aItems = new Array();
        
        
        this._initBg();
        this._initHero();
        this._initFg();
        
        _oInterface = new CInterface();
        
        _oReadyGoAnim = new CReadyGoAnim({x:CANVAS_WIDTH/2,y:s_iOffsetY - 300},{x:CANVAS_WIDTH/2,y:CANVAS_HEIGHT+200},120,"#fff",_oContainerFg);
        _oReadyGoAnim.addEventListener(ON_END_READYGO_ANIM,this._startGame,this);
        
        this.reset();
        
        _oHelpPanel = new CHelpPanel();
        _oHelpPanel.addEventListener(ON_EXIT_FROM_HELP,this._onExitFromHelp,this);
        
        _oAreYouSurePanel = new CAreYouSurePanel(s_oStage);
        _oAreYouSurePanel.addEventListener(ON_BUT_YES_DOWN,this.onConfirmExit,this);
        _oAreYouSurePanel.addEventListener(ON_BUT_NO_DOWN,this.onQuitExit,this);
        
        _oGameOverPanel = new CEndPanel();
        _oGameOverPanel.addEventListener(ON_BACK_MENU,this.onConfirmExit,this);
        _oGameOverPanel.addEventListener(ON_RESTART,this._restartLevel,this);

        this.refreshButtonPos();
        
       
        if(s_bFirstPlay){
            s_bFirstPlay = false;
            this.showHelpPanel();
            
        }else{
            this.prepareStartLevel();
        }
        
    };
    
    
    this.unload = function(){
        _oInterface.unload();
        
        _oGameOverPanel.unload();
        
        _oHelpPanel.unload();

        s_oGame = null;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren(); 
    };
    
    this.refreshButtonPos = function(){

        _oInterface.refreshButtonPos();
    };

    
    this.reset = function(){
        _bUpdate = false;
        _bLogoOn = false;
        _bGameOver = false;
        _bKeyDown = false;
        _iTimeElapsLogo = 0;
        _iTimeElapsSpawn = 0;
        // _iTimeElaps = TIME_LEVEL;
        _iHealth = HEALTH;
        _iScore = 0;
        _iCurSpawnTime = START_SPAWN_ITEM_TIME;
        _aItemsToRemove = new Array();
        
        
        _oHero.reset();
        _oInterface.reset(_iScore);
        
        
        for(var k=0;k<_aItems.length;k++){
            _aItems[k].unload();
        }
        
        _aItems = new Array();
    };
    
    this._initBg = function(){
        _oContainerBg = new createjs.Container();
        s_oStage.addChild(_oContainerBg);
        
         var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        _oContainerBg.addChild(oBg); 
        
        
        //FIREPLACE
        var oData = {   
                        framerate:30,
                        images: [s_oSpriteLibrary.getSprite("fireplace")], 
                        // width, height & registration point of each sprite
                        frames: {width:392 , height: 340}, 
                        animations: {static:0,anim:[0,24]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        var oFirePlace = createSprite(oSpriteSheet,"anim",0,0,392,340);
        oFirePlace.x = 460;
        oFirePlace.y = 1152;
        _oContainerBg.addChild(oFirePlace);
        
        
        //XMAS TREE
        var aSprites = new Array();
        for(var k=0;k<27;k++){
            aSprites.push(s_oSpriteLibrary.getSprite("tree_"+k));
        }
        var oData = {   
                        framerate:30,
                        images: aSprites, 
                        // width, height & registration point of each sprite
                        frames: {width:412 , height: 749}, 
                        animations: {static:0,anim:[0,26]}
                   };
                   
        var oSpriteSheetTree = new createjs.SpriteSheet(oData);
        var oTree = createSprite(oSpriteSheetTree,"anim",0,0,412,749);
        oTree.x = 1078;
        oTree.y = 700;
        _oContainerBg.addChild(oTree);
    };
    
    this._initHero = function(){
        _oContainerHero = new createjs.Container();
        s_oStage.addChild(_oContainerHero);
        
        _oHero = new CHero(CANVAS_WIDTH/2,FLOOR_Y,_oContainerHero);
        /*
        _oDebug = new createjs.Shape();
        _oDebug.graphics.beginFill("red").drawRect(0, 0, 100, 100);
        _oContainerHero.addChild(_oDebug);*/
    };
        
    this._initFg = function(){
        _oContainerFg = new createjs.Container();
        s_oStage.addChild(_oContainerFg);
        
        var oFg = createBitmap(s_oSpriteLibrary.getSprite("bg_game_mask"));
        _oContainerFg.addChild(oFg);
        
        var oData = {   
                        framerate:10,
                        images: [s_oSpriteLibrary.getSprite("logo_game")], 
                        // width, height & registration point of each sprite
                        frames: {width:879 , height: 218}, 
                        animations: {off:0,on:1,anim:[0,1]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oGameLogo = createSprite(oSpriteSheet,"off",0,0,879,218);
        _oGameLogo.x = 524;
        _oGameLogo.y = 346;
        _oContainerFg.addChild(_oGameLogo);
    };
    
    this.showHelpPanel = function(){
        _oHelpPanel.show();
    };
    
    this._onExitFromHelp = function(){

        if(_iHealth < HEALTH){
            _oInterface.collapseGUIButtons();
        }else{
            this.prepareStartLevel();
        }

        // if(_iTimeElaps < TIME_LEVEL){
        //     _oInterface.collapseGUIButtons();
        // }else{
        //     this.prepareStartLevel();
        // }
    };
            
    this.prepareStartLevel = function(){
        _oReadyGoAnim.show();
    };
    
    this._startGame = function(){
        s_oGame._spawnItem();
        _bUpdate = true;
    };
    
    this._restartLevel = function(){
        this.reset();
        
        this.prepareStartLevel();
    };
    
    this._spawnItem = function(){
        var iRandX = Math.floor(Math.random() * (ITEM_LIMIT_RIGHT - ITEM_LIMIT_LEFT + 1)) + ITEM_LIMIT_LEFT;
        
        var iRand = Math.floor(Math.random() * 100);
        var iRandType;
        if(iRand < MALUS_PERC){
            iRandType = MALUS_ID;
        }else{
            iRandType = Math.floor(Math.random()*6);
        }
        
        var oItem = new CItem(iRandX,START_ITEM_Y,iRandType,_oContainerHero);
        oItem.addEventListener(ON_ITEM_FALL,this._onItemFall,this);
        _aItems.push(oItem);
    };
    
    this._onItemFall = function(oItem){
        for(var i=0;i<_aItems.length;i++){
            if(_aItems[i] === oItem){
                _aItemsToRemove.push(oItem);
                break;
            }
        }
    };
    
    this.onKeyDown = function(evt){
        if(_bUpdate === false){
            evt.preventDefault();
            return false;
        }
        
        
        if (!evt) {  
            evt = window.event; 
        }
        
        switch(evt.keyCode) {    
            case LEFT_DIR: {
                _bKeyDown = true;
                _oHero.moveLeft(true);
                break;
            };
      
            case RIGHT_DIR: {
               _bKeyDown = true;
                _oHero.moveRight(true);
                break;
            };

        }
        
        evt.preventDefault();
        return false;
    };

    this.onKeyUp = function(evt) { 
        if (  _bGameOver){
            evt.preventDefault();
            return false;
        }
        
        if(!evt){ 
            evt = window.event; 
        } 

        _bKeyDown = false;
        switch(evt.keyCode) {  
           // left  
           case 37: {
                   _oHero.moveLeft(false);
                   break; 
               }
                              
           // right  
           case 39: {
                   _oHero.moveRight(false);
                   break; 
               }
        } 
        
        evt.preventDefault();
        return false;
    };
    
    this.moveLeft = function(bDown){
        if(_bUpdate === false){
            return;
        }
        
        _bKeyDown = true;
        _oHero.moveLeft(bDown);
    };

    this.moveRight = function(bDown){
        if(_bUpdate === false){
            return;
        }
        
        _bKeyDown = true;
        _oHero.moveRight(bDown);
    };
    
    this.onExit = function(){
        _oAreYouSurePanel.show(TEXT_ARE_YOU_SURE,90);
    };
    
    this.onConfirmExit = function(){
        this.unload();
        
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        
        s_oMain.gotoMenu();
    };
    
    this.onQuitExit = function(){
        _oInterface.collapseGUIButtons();
    };

    this.gameOver = function(){   
        _bUpdate = false;

        if(_iScore > s_iBestScore){
            s_iBestScore = _iScore;
            
            _oInterface.refreshBestScore();
        }
        
        _oGameOverPanel.show(_iScore);
        _oHero.setIdle();
        
        saveItem(PREFIX_LOCAL_STORAGE+"_best_score",s_iBestScore);
    };
    
    this._refreshScore = function(iAmount){
        _iScore += iAmount;
        if(_iScore < 0){
            _iScore = 0;
        }
        _oInterface.refreshScore(_iScore);
    };

    this._refreshHealth= function(_iHealth){

        if(_iHealth < 0){
            _iHealth = 0;
        }
        _oInterface._refreshHealth(_iHealth);

    };
    
    this._checkCollision = function(){
        var oRectHero = _oHero.getRectCollision();
        //_oDebug.graphics.clear();
        //_oDebug.graphics.beginFill("red").drawRect(oRectHero.x, oRectHero.y, oRectHero.width, oRectHero.height);
        
       for(var i=0;i<_aItems.length;i++){
           var oRectItem = _aItems[i].getRectCollision();
           if(oRectHero.intersects(oRectItem) ){

               var iAmount;
               if(_aItems[i].getType() === MALUS_ID){
                   playSound("catch_malus",1,false);
                   _oHero.collectBad();
                   _iHealth = _iHealth -1;
                   iAmount = -MALUS_POINTS;
                   this._refreshHealth(_iHealth);
               }else{
                   playSound("catch_item",1,false);
                   _oHero.collectGood();
                   iAmount = ITEM_POINTS;
               }
               
               _aItems[i].hide(0);
               
               new CScoreText(iAmount,_aItems[i].getX(),_aItems[i].getY(),_oContainerFg);
               this._refreshScore(iAmount);

           }
       }
       
    };
    
    this.stopUpdate = function(){
        _bUpdate = false;
    };
    
    this.startUpdate = function(){
        _bUpdate = true;
    };
    
    this._updateLogo = function(){
        _iTimeElapsLogo += s_iTimeElaps;
        
        if(_bLogoOn){
            if(_iTimeElapsLogo > TIME_LOGO_BLINK){
                _iTimeElapsLogo = 0;
                _bLogoOn = false;
                _oGameLogo.gotoAndStop("off");
            }
        }else{
            if(_iTimeElapsLogo > TIME_LOGO_OFF){
                _iTimeElapsLogo = 0;
                _bLogoOn = true;
                _oGameLogo.gotoAndPlay("anim");
            }
        }
    };

    this.update = function(){
        if(!_bUpdate){
            return;
        }
        
        this._updateLogo();
        
        _iTimeElapsSpawn += s_iTimeElaps;
        if(_iTimeElapsSpawn > _iCurSpawnTime){
            _iTimeElapsSpawn = 0;
            _iCurSpawnTime -= DECREASE_SPAWN_TIME;
            if(_iCurSpawnTime<MIN_SPEED_ITEM){
                _iCurSpawnTime = MIN_SPEED_ITEM;
            }

            this._spawnItem();
        }
        
        _oHero.update();
        
        for(var i=0;i<_aItems.length;i++){
            _aItems[i].update();
        }
        
        this._checkCollision();
        
        //REMOVE ITEM IN GARBAGE LIST
        for(var j=0;j<_aItemsToRemove.length;j++){
            for(var k=0;k<_aItems.length;k++){
                if(_aItemsToRemove[j] === _aItems[k]){
                    _aItems.splice(k,1);
                    break;
                }
            }
        }
        
        _aItemsToRemove = new Array();
        
        //REFRESH GAME TIME
        
        if(_iHealth == 0){
            _iHealth = 0;
            this.gameOver();
        }
        
        // _oInterface._refreshHealth(_iHealth);
    };

    s_oGame = this;
    
    this._init();
}

var s_oGame = null;
