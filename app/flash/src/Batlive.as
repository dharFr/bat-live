package
{
    import flash.display.Sprite;
    import flash.events.Event;
    import com.endseven.Upstream;
    import flash.events.MouseEvent;
    import flash.text.TextField;
    import flash.text.TextFieldAutoSize;
    import flash.external.ExternalInterface;
    import flash.display.StageAlign;
    import flash.display.StageScaleMode;
    import flash.display.LoaderInfo;

    /**
     * ...
     * @author myArcane
     */
    public class Batlive extends Sprite
    {
        private var _upstream:Upstream;

        public function Batlive():void
        {
            if (stage)
                init();
            else
                addEventListener(Event.ADDED_TO_STAGE, init);
        }

        /* the constructor. */
        private function getFlashVars () : Object
        {
            var paramList:Object = LoaderInfo( this.root.loaderInfo ).parameters;
            return paramList;
        }

        /* init */
        private function init(e:Event = null) : void
        {
            stage.align = StageAlign.TOP_LEFT;
            stage.scaleMode = StageScaleMode.NO_SCALE;
            goBatLive();
        }

        /* go bat live */
        private function goBatLive() : void
        {
            if (getFlashVars()['serverURL'] && getFlashVars()['streamName'])
            {
                _upstream = new Upstream(getFlashVars()['serverURL'], getFlashVars()['streamName']);
            }
            else
            {
                _upstream = new Upstream();
            }

            addChild(_upstream);
        }
    }

}
