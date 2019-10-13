import React from 'react';
import Dashboard from './Dashboard';
class Popup extends React.Component {

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>                
                    <button onClick={this.props.closePopup} class="btn-exit">Exit</button>
                    <Dashboard ID={this.props.ID}/>
                </div>
            </div>
        );
    }
}

export default Popup;