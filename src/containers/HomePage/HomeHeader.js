import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions/appActions'

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.fee" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.check-health" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i>
                                <b><FormattedMessage id="home-header.support" /></b>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active ' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span> </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active ' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span> </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            <FormattedMessage id="banner.title1" />
                        </div>
                        <div className='title2'>
                            <FormattedMessage id="banner.title2" />
                        </div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input placeholder='Search...'></input>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-hospital-alt"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child1" />
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-phone-volume"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child2" />
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-file-medical"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child3" />
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <i className="fab fa-product-hunt"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child4" />
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <i className="fa-duotone fa-notes-medical"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.child5" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (data) => dispatch(changeLanguageApp(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
