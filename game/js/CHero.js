function CHero(iX,iY,oParentContainer){
    var _bLeft = false;
    var _bRight = false;
    var _iXMove;
    var _iCurAcceleration;
    var _iCurMaxSpeed;
    var _pStartPos;
    var _oRectCollision;
    
    
    var _oHero;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iX,iY){
        _pStartPos = {x:iX,y:iY};
        
        _iXMove = 0;
        _iCurAcceleration = HERO_ACCELERATION;
        _iCurMaxSpeed = MAX_HERO_SPEED;
        _oRectCollision = new createjs.Rectangle(0,0,100,100);
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
        var character = sessionStorage.getItem('character');

        var oData = {   
                        images: [s_oSpriteLibrary.getSprite(character)], 
                        // width, height & registration point of each sprite
                        frames: {width: 334, height: 289,regX:167,regY:289}, 
                        animations: {idle:0,catch_good:[1,5,"idle"],walk:[6,24],catch_bad:[25,29,"idle"]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oHero = createSprite(oSpriteSheet,"idle",167,289,334,289);
        _oContainer.addChild(_oHero);
        
        
    };
    
    this.reset = function(){
        _iXMove = 0;
        _bLeft = false;
        _bRight = false;
        _oHero.gotoAndStop("idle");
        
        _oHero.framerate = 30;
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
    };
    
    this.setIdle = function(){
        _oHero.gotoAndStop("idle");
    };
    
    this.collectGood = function(){
        if(_oHero.currentAnimation === "idle"){
            _oHero.framerate = 15;
            _oHero.gotoAndPlay("catch_good");
        } 
    };
    
    this.collectBad = function(){
        if(_oHero.currentAnimation === "idle"){
            _oHero.framerate = 15;
            _oHero.gotoAndPlay("catch_bad");
        } 
    };
    
    this.moveLeft = function(bLeft){
        _bLeft = bLeft;
        if(!_bLeft){
            _oHero.gotoAndStop("idle");
            _oContainer.scaleX = 1;
        }else if(_oHero.currentAnimation !== "walk"){
            _oHero.framerate = 30;
            _oHero.gotoAndPlay("walk");
            _oContainer.scaleX = -1;
        }
    };

    this.moveRight = function(bRight){
        _bRight = bRight;
        if(!_bRight){
            _oHero.gotoAndStop("idle");
            _oContainer.scaleX = 1;
        }else if(_oHero.currentAnimation !== "walk"){
            _oHero.framerate = 30;
            _oHero.gotoAndPlay("walk");
            _oContainer.scaleX = 1;
        }
    };
    
    this.getRectCollision = function(){
        return _oRectCollision;
    };
    
    this._updateRectCollision = function(){
        if(_oHero.currentAnimation === "walk"){
            if(_oContainer.scaleX === 1){
                _oRectCollision.setValues(_oContainer.x-20,_oContainer.y-170,100,40);
            }else{
                _oRectCollision.setValues(_oContainer.x-80,_oContainer.y-170,100,40);
            }
            
        }else{
            _oRectCollision.setValues(_oContainer.x-90,_oContainer.y-160,95,40);
        }
    };
    
    this.update = function(){
        if(_bLeft){
            _iXMove -= _iCurAcceleration;
        }
        if(_bRight){
            _iXMove += _iCurAcceleration;
        }
        
        _oContainer.x += _iXMove;
        
        _iXMove *= HERO_FRICTION;
        if (_iXMove > _iCurMaxSpeed) {
                _iXMove = _iCurMaxSpeed;
        }
        
        if (_iXMove < -_iCurMaxSpeed) {
                _iXMove = -_iCurMaxSpeed;
        }

        if ( Math.abs(_iXMove) < 0.1 ) {
                _iXMove = 0;
        }
		
	if( ((_oContainer.x  + _iXMove) > HERO_LIMIT_RIGHT)){  
            _oContainer.x = HERO_LIMIT_RIGHT  - _iXMove;
        }
        
        if((_oContainer.x -  _iXMove)< HERO_LIMIT_LEFT) {
            _oContainer.x = HERO_LIMIT_LEFT +_iXMove;
        }
        
        this._updateRectCollision();
    };
    
    this._init(iX,iY);
}