function CHelpPanel(){
    var _iStartY;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;
    
    var _oFade;
    var _oButStart;
    var _oContainer;
    var _oContainerPanel;
    
    var _oThis = this;
    
    this._init = function(){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        _oListener = _oFade.on("click", function () {});
        _oContainer.addChild(_oFade);
        
        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH/2;
        _oContainer.addChild(_oContainerPanel);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        var oBg = createBitmap(oSpriteBg);
        _oContainerPanel.addChild(oBg);
        

        var aItemList = [0,1,2,3,4,5];
        aItemList = shuffle(aItemList);
        var iX = 150;
        for(var i=0;i<3;i++){
            var oItem = new CItem(iX,150,aItemList.pop(),_oContainerPanel);
            
            iX += 120;
        }
        
        
        var oTextCollect = new CTLText(_oContainerPanel, 
                    iX - 40, oSpriteBg.height/2-150, 290, 50, 
                    50, "left", "#fff", FONT, 1,
                    0, 0,
                    TEXT_COLLECT,
                    true, true, false,
                    false );

        
        
        var oMalus = new CItem(300,300,6,_oContainerPanel);
        
        var oTextAvoid = new CTLText(_oContainerPanel, 
                    iX - 40, 280, 290, 50, 
                    50, "left", "#fff", FONT, 1,
                    0, 0,
                    TEXT_AVOID,
                    true, true, false,
                    false );


        
        
        if(s_bMobile){
            var oSpriteKeys = s_oSpriteLibrary.getSprite("but_left");
            var oKeyLeft = createBitmap(oSpriteKeys);
            oKeyLeft.x = 120;
            oKeyLeft.y = 380;
            oKeyLeft.scaleX = oKeyLeft.scaleY = 0.8;
            _oContainerPanel.addChild(oKeyLeft);
            
            var oTextMove = new CTLText(_oContainerPanel, 
                    oSpriteBg.width/2-150, 420, 300, 60, 
                    60, "center", "#fff", FONT, 1,
                    0, 0,
                    TEXT_MOVE,
                    true, true, false,
                    false );


            var oSpriteKeys = s_oSpriteLibrary.getSprite("but_right");
            var oKeyRight = createBitmap(oSpriteKeys);
            oKeyRight.x = 600;
            oKeyRight.y = 380;
            oKeyRight.scaleX = oKeyRight.scaleY = 0.8;
            _oContainerPanel.addChild(oKeyRight);
        }else{

            var oSpriteKeys = s_oSpriteLibrary.getSprite("keyboard_left");
            var oKeyLeft = createBitmap(oSpriteKeys);
            oKeyLeft.x = 150;
            oKeyLeft.y = 400;
            _oContainerPanel.addChild(oKeyLeft);
            
            var oTextMove = new CTLText(_oContainerPanel, 
                    oSpriteBg.width/2-150, 430, 300, 60, 
                    60, "center", "#fff", FONT, 1,
                    0, 0,
                    TEXT_MOVE,
                    true, true, false,
                    false );


            var oSpriteKeys = s_oSpriteLibrary.getSprite("keyboard_right");
            var oKeyRight = createBitmap(oSpriteKeys);
            oKeyRight.x = 600;
            oKeyRight.y = 400;
            _oContainerPanel.addChild(oKeyRight);
        }
        
        _oButStart = new CGfxButton(oSpriteBg.width/2, 660,s_oSpriteLibrary.getSprite("but_yes"),_oContainerPanel);
        _oButStart.addEventListener(ON_MOUSE_UP,this._onStart,this);
        
        _iStartY = -oSpriteBg.height/2 - 200;
        
        _oContainerPanel.regX = oSpriteBg.width/2;
        _oContainerPanel.regY = oSpriteBg.height/2;
    };
    
    this.unload = function(){
        _oFade.off("click",_oListener);
        _oButStart.unload();
        
        s_oStage.removeChild(_oContainer);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.show = function(){
        _oFade.alpha = 0;
        _oContainerPanel.y = _iStartY;
        _oContainer.visible = true;
        
        createjs.Tween.get(_oFade).to({alpha:0.7}, 500);
        createjs.Tween.get(_oContainerPanel).wait(400).to({y:CANVAS_HEIGHT/2}, 1000,createjs.Ease.bounceOut).call(function(){s_oMain.stopUpdateNoBlock();});
    };
    
    this.hide = function(){
        s_oMain.startUpdateNoBlock();
        createjs.Tween.get(_oContainerPanel).to({y:_iStartY}, 1000,createjs.Ease.backIn).call(function(){
                                                                                        if(_aCbCompleted[ON_EXIT_FROM_HELP]){
                                                                                            _aCbCompleted[ON_EXIT_FROM_HELP].call(_aCbOwner[ON_EXIT_FROM_HELP]);
                                                                                        }  
                                                                                });
        createjs.Tween.get(_oFade).to({alpha:0}, 1000);
    };
    
    this._onStart = function(){
        _oThis.hide();
    };
    
    this._init();
}