import React, { Component, Fragment } from 'react';
import {assetsUrl} from '../../globalConstants';
import {sendGA} from '../../helper';
import LazyLoad from 'react-lazy-load';
import styles from './home_footer.css';

class HomeFooter extends Component {
  render() {
    const socialLinksData = [
      {
        'link': 'https://www.facebook.com/truebil?fref=ts',
        'type': 'facebook',
        'label': 'Facebook',
        'gaAction': 'fb_footer'
      },
      {
        'link': 'https://twitter.com/mytruebil?lang=en',
        'type': 'twitter',
        'label': 'Twitter',
        'gaAction': 'twitter_footer'
      },
      {
        'link': 'https://www.linkedin.com/company/truebil',
        'type': 'linkedin',
        'label': 'Linked In',
        'gaAction': 'linkedin_footer'
      }
    ];
    var socialGAData = { 'data-ga-category': 'social' };
    const socialLinksHtml = socialLinksData.map((socialLink, i) => {
      socialGAData['data-ga-action'] = socialLink.gaAction;
      return (
        <li key={i}>
          <a href={socialLink.link} {...socialGAData} onClick={sendGA}>
            <LazyLoad debounce={false}>
              <img src={ assetsUrl + "images/" + socialLink.type + "-v2.svg" }
                 alt={socialLink.label + " Icon"}
                 className={"icon-" + socialLink.type + " media-icon"} />
            </LazyLoad>
            <span className={"media-text " + socialLink.type}>{socialLink.label}</span>
          </a>
        </li>
      );
    });

    const supportLinksData = [
      {
        'link': '/about',
        'label': 'About Us',
        'gaAction': 'about_us'
      },
      {
        'link': '/contact',
        'label': 'Contact Us',
        'gaAction': 'contact_us'
      },
      {
        'link': 'https://www.truebil.com/blog',
        'label': 'Blog',
        'gaAction': 'blog'
      },
      {
        'link': 'https://truebil.recruiterbox.com',
        'label': 'Careers',
        'gaAction': 'career'
      },
    ];
    var supportGAData = { 'data-ga-category': 'landing' };
    const supportLinksHtml = supportLinksData.map((supportLink, i) => {
      supportGAData['data-ga-action'] = 'clicked_' + supportLink.gaAction;
      return (
        <li key={i}>
          <a href={supportLink.link} {...supportGAData} onClick={sendGA}>{supportLink.label}</a>
        </li>
      );
    });

    return (
      <Fragment>
        <style jsx global>{ styles } </style>
        <footer className="home-footer">
          <div className="social-logos">
            <ul className="media">
              {socialLinksHtml}
            </ul>
          </div>
          <ul className="company-support">
            {supportLinksHtml}
          </ul>
          <p className="home-copyright">© 2019 Paix Technology Pvt. Ltd.</p>
        </footer>
      </Fragment>
    );
  }
}

export default HomeFooter;