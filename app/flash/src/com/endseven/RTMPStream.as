
package com.endseven
{

    import flash.display.MovieClip;
    import flash.media.Video;
    import flash.net.NetConnection;
    import flash.net.NetStream;

    public class RTMPStream extends MovieClip
    {

        protected var sMediaServerURL:String = "rtmp://publish2.dailymotion.com/publish-dm";
        protected var sStreamName:String = "x146etc?auth=1712051963_f1ab3f7113491fd52827093a7d3f1a49";

        protected var oConnection:NetConnection;
        protected var oMetaData:Object = new Object();
        protected var oNetStream:NetStream;
        protected var oVideo:Video;

        /* the constructor */
        public function RTMPStream():void
        {

            NetConnection.prototype.onBWDone = function(oObject1:Object):void
            {
                trace("onBWDone: " + oObject1.toString()); // some media servers are dumb, so we need to catch a strange event..
            }

        }

        /* triggered when meta data is received. */
        protected function eMetaDataReceived(oObject:Object):void
        {
            trace("MetaData: " + oObject.toString()); // debug trace..
        }

    }

}

