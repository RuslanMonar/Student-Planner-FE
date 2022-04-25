import ScaleLoader from "react-spinners/ScaleLoader";

export const Loader = ({ ...settings }) => {
    var loading = settings.loading ? settings.loading : true;
    var height = settings.height ? settings.height : 75;
    var width = settings.width ? settings.width : 13;
    var margin = settings.margin ? settings.margin : 8;
    var textAlign = settings.textAlign ? settings.textAlign : "unset";
    var indentation = settings.indentation ? settings.indentation : "0px"
    return (
        <div style={{ "textAlign": textAlign, "margin": indentation }}>
            <ScaleLoader
                color={"#6366f1"}
                loading={loading}
                height={height}
                width={width}
                margin={margin}
            />
        </div>
    );
};