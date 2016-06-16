/** @jsx createElement */
import _ from 'lodash'

import {URL} from 'lacona-phrases'
import {createElement} from 'elliptical'
import {openURL} from 'lacona-api'
import { String, Command } from 'lacona-phrases'

//const Drupal = {
//  describe () {
//    return (
//      <repeat unique separator={<list items={[' and ', ', and ', ', ']} limit={1} category='conjunction' />}>
//        <label text='type' suppressEmpty={false}>
//          <list items={[{text: 'module', value: '/module'}, {text: 'theme', value: '/theme'}]} limit={2} strategy='fuzzy' />
//        </label>
//      </repeat>
//    )
//  }
//}

const DQuery = {
  describe () {
    return <String limit={1} argument='query' />
  }
}

const SearchDrupal = {
  extends: [Command],

  execute (result) {
    const query = encodeURIComponent(result.dquery);
    openURL({url: 'http://drupal.org/project/' + query});
  },

  describe () {
    return (
      <choice limit="{1}">
        <sequence>
          <literal text="dr" category="action" />
          <literal text=" " />
          <literal text="for " decorate optional limited preferred />
          <DQuery id="dquery" />
        </sequence>
      </choice>
    )
  }
}

export default [SearchDrupal]