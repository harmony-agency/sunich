function CItem(iX,iY,iType,oParentContainer){
    var _bUpdate;
    var _iType = iType;
    var _iYMove;
    var _iDirRotation;
    var _iArrivalY;
    var _aCbCompleted;
    var _aCbOwner;
    var _oRectCollision;

    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    var _oThis = this;
    
    this._init = function(iX,iY,iType){
        _iYMove = 0;
        _iDirRotation = Math.random()>0.5?1:-1;
        _iArrivalY = FLOOR_Y-77;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        _oRectCollision = new createjs.Rectangle(0,0,100,100);
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
         var oData = {   
                        images: [s_oSpriteLibrary.getSprite("items")], 
                        // width, height & registration point of each sprite
                        frames: {width:168 , height: 154,regX:84,regY:77}, 
                        animations: {type_0:0,type_1:1,type_2:2,type_3:3,type_4:4,type_5:5,type_6:6}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        var oSprite = createSprite(oSpriteSheet,"type_"+iType,84,77,168,154);
        _oContainer.addChild(oSprite);
        
        _bUpdate = true;
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.unload = function(){
        _oParentContainer.removeChild(_oContainer);
    };
    
    this.hide = function(iTime){
        createjs.Tween.get(_oContainer).to({alpha:0},iTime).call(function(){_oThis.unload();});
        
        if(_aCbCompleted[ON_ITEM_FALL]){
            _aCbCompleted[ON_ITEM_FALL].call(_aCbOwner[ON_ITEM_FALL],this);
        }
    };
    
    this.getRectCollision = function(){
        return _oRectCollision;
    };
    
    this.getType = function(){
        return _iType;
    };
    
    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getY = function(){
        return _oContainer.y;
    };
    
    this._updateRectCollision = function(){
        _oRectCollision.setValues(_oContainer.x - 84,_oContainer.y-77,150,150);
    };
    
    this.update = function(){
        if(_bUpdate){
            this._updateRectCollision();
            
            _iYMove += ITEM_SPEED;
            if (_iYMove > MAX_SPEED_ITEM) {
                _iYMove = MAX_SPEED_ITEM;
            }
            
            _oContainer.y += _iYMove;
            _oContainer.rotation += 0.5*_iDirRotation;
            if(_oContainer.y > _iArrivalY){
                this.hide(500);
                
            }
        }
    };
    
    this._init(iX,iY,iType);
}