import faker from 'faker';
import url from './constant';

const title = faker.lorem.words();

module.exports = {
  'Create document': (browser) => {
    browser
     .url(url.signin)
     .waitForElementVisible('body')
     .assert.containsText('h3', 'Signin Here:')
     .setValue('input[type=email]', 'info@okdocs.com')
     .setValue('input[type=password]', 'asdfghjk')
     .click('input[type=submit]')
     .pause(2000)
     .waitForElementVisible('nav')
     .assert.urlContains('dashboard')
     .assert.elementPresent('#pushpin')
     .click('i[id="newdocument"]')
     .pause(2000)
     .setValue('input[id="documentTitle"]', `${title}`)
     .execute('document.getElementById("access").value="public"')
     .execute('CKEDITOR.instances.editor.setData("My Content")')
     .pause(2000)
     .click('#save')
     .click('#exit')
     .pause(2000)
     .assert.urlContains('my-documents')
     .click('#pushpin')
     .click('#alldocuments')
     .pause(1000)
     .assert.urlContains('all-documents')
     .assert.elementPresent('input[id="limit"]')
     .assert.elementPresent('input[id="offset"]')
     .click('#pushpin')
     .click('#search-link')
     .pause(1000)
     .assert.urlContains('search')
     .assert.elementPresent('input[id="limit"]')
     .assert.elementPresent('input[id="offset"]')
     .click('#pushpin')
     .click('#allusers')
     .pause(1000)
     .assert.urlContains('all-users')
     .assert.elementPresent('input[id="limit"]')
     .assert.elementPresent('input[id="offset"]')
     .click('#pushpin')
     .click('#editprofile')
     .pause(1000)
     .assert.urlContains('edit-profile')
     .pause(2000)
     .assert.elementPresent('input[id="firstName"]')
     .assert.elementPresent('input[id="password"]')
     .end();
  }
};
