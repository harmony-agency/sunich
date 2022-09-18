var CANVAS_WIDTH = 1920;
var CANVAS_HEIGHT = 1920;

var EDGEBOARD_X = 0;
var EDGEBOARD_Y = 0;

var FONT = "IRANSansDN";


var FPS      = 30;
var DISABLE_SOUND_MOBILE = false;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_LEVEL    = 2;
var STATE_GAME    = 3;

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_BUT_YES_DOWN  = 4;
var ON_BUT_NO_DOWN = 5;
var ON_BACK_MENU = 6;
var ON_RESTART = 7;
var ON_NEXT = 8;
var ON_ITEM_FALL = 9;
var ON_END_READYGO_ANIM = 10;
var ON_EXIT_FROM_HELP = 11;

var DIR_RIGHT = 0;
var DIR_LEFT = 1;


var ANIM_IDLE = "idle";
var ANIM_WALK = "walk";
var ANIM_CATCH = "catch";

var PREFIX_LOCAL_STORAGE = "sunich_kids";
var ENABLE_FULLSCREEN;

// KEY CODES
var LEFT_DIR = 37;
var RIGHT_DIR = 39;

var TIME_LOGO_OFF = 8000;
var TIME_LOGO_BLINK = 2000;
var HERO_LIMIT_LEFT = 480;
var HERO_LIMIT_RIGHT = 1488;
var ITEM_LIMIT_LEFT = 484;
var ITEM_LIMIT_RIGHT = 1438;

var HERO_ACCELERATION;
var MAX_HERO_SPEED;
var HERO_FRICTION;
var ITEM_SPEED = 0.1;
var MAX_SPEED_ITEM = 20;
var START_ITEM_Y = 400;
var START_SPAWN_ITEM_TIME = 1500;
var DECREASE_SPAWN_TIME = 20;
var MIN_SPEED_ITEM = 400;
var FLOOR_Y = 1500;
var MALUS_PERC;
var MALUS_ID = 6;
var TIME_LEVEL;
var ITEM_POINTS;
var MALUS_POINTS;
var SOUNDTRACK_VOLUME_IN_GAME  = 0.5;