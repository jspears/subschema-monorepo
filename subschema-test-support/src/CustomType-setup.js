const {PropTypes} = Subschema;

//This adds it to the loader, loader.addType still works.
class SwitchButton extends React.Component {
    //Prevents form-control from being passed to className.
    static inputClassName = ' ';

    static propTypes = {
        //This tells subschema to not process e.target.value, but just take the value.
        onChange: PropTypes.valueEvent,
        //Normal React.PropTypes
        onText: React.PropTypes.string,
        offText: React.PropTypes.string
    };

    static defaultProps = {
        onText: "ON",
        offText: "OFF"
    };

    //In case you have "special" value handling.
    isChecked(value) {
        return value === true || value === 1 || value === 'on';
    }

    //This is bound to the object instance
    handleClick = (e)=> {
        //This updates the valueManager
        this.props.onChange(this.isChecked(this.props.value) ? '' : 'on');
    };

    render() {
        var props = this.props;
        var isChecked = this.isChecked(props.value);

        //you prolly won't do it this way, but use classes instead, but the demo platform
        // has its limitations.
        var container = Object.assign({}, styles.container, isChecked ? styles.on : styles.off);
        var button = Object.assign({}, styles.button, isChecked ? styles.buttonOn : styles.buttonOff);

        return <div className={props.className} style={styles.fieldContainer}>
            <div style={container} onClick={this.handleClick}>
                <input name={props.name} type="hidden" value={this.props.value}/>
                {isChecked === true ? props.onText : props.offText}
                <span style={button}/>
            </div>
        </div>
    }

}

//Normally you would do this via CSS but the demo can't load css dynamically, so this a workaround.
var styles = {
    fieldContainer: {
        display: 'block',
        width: '100%',
        height: '34px',
        padding: '6px 12px',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#555',
        backgroundColor: '#fff'
    },
    container: {
        position: 'relative',
        borderRadius: "11px",
        backgroundColor: '#fff',
        border: 'inset 2px',
        boxSizing: 'border-box',
        display: 'inline-block',
        cursor: 'pointer',
        transition: 'background .5s ease-in-out'
    },
    on: {
        color: 'white',
        backgroundColor: 'blue',
        paddingLeft: '20px',
        paddingRight: '6px',

    },
    off: {
        paddingLeft: '6px',
        paddingRight: '20px'
    },
    button: {
        top: 2,
        display: 'inline-block',
        height: '16px',
        width: '16px',
        boxSizing: 'border-box',
        borderRadius: '8px',
        border: '5px inset rgba(204, 204, 204, .4)',
        transform: 'rotate(180deg)',
        position: 'absolute',
        transition: 'all .4s',

    },
    buttonOn: {
        left: 1,
        transform: 'rotate(10deg)',
    },
    buttonOff: {
        left: '100%',
        marginLeft: '-18px',
    }
};
loader.addType('SwitchButton', SwitchButton);