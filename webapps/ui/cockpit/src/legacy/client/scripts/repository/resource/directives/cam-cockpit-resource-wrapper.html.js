/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = `<!-- # cockpit client/scripts/repository/resource/directives/cam-cockpit-resource-wrapper.html -->
<div ng-show="!resourceState.$loaded"
     class="loader">
  <span class="animate-spin glyphicon glyphicon-refresh"></span>
  {{ 'REPOSITORY_DEPLOYMENT_RESOURCE_DIRECTIVES_LOADING' | translate }}
</div>

<div ng-show="resourceState.$loaded">

  <div ng-if="!resource">
    <div class="no-resource well">
      <span class="glyphicon glyphicon-info-sign"></span>
      {{ 'REPOSITORY_DEPLOYMENT_RESOURCE_DIRECTIVES_SELECT_SRC' | translate }}
    </div>
  </div>

  <section ng-if="resource" class="resource">

    <header class="row">
      <div class="col-xs-12"
           cam-resource-meta
           resource-data="resourceData"
           control="control">
      </div>
    </header>

    <div class="section-content row">
      <div class="col-xs-12"
           cam-resource-content
           resource-data="resourceData"
           control="control">
      </div>

      <div ng-show="resourceDetailTabs.length"
           class="col-xs-12 ctn-tabbed-content">

        <ul ng-if="resourceDetailTabs.length > 1"
            class="nav nav-tabs">
          <li ng-class="{ active: selectedResourceDetailTab == resourceDetailTab }"
              ng-repeat="resourceDetailTab in resourceDetailTabs">
            <a href
               ng-click="selectResourceDetailTab(resourceDetailTab)">{{ resourceDetailTab.label }}</a>
          </li>
        </ul>

        <h4 ng-if="resourceDetailTabs.length === 1">{{ resourceDetailTabs[0].label | translate }}:</h4>

        <div class="tab-content">
          <view provider="selectedResourceDetailTab"
                vars="resourceVars" />
        </div>

      </div><!-- / !!resourceDetailTabs -->

    </div><!-- / .section-content -->

  </section>

</div>
<!-- / cockpit client/scripts/repository/resource/directives/cam-cockpit-resource-wrapper.html -->
`;
