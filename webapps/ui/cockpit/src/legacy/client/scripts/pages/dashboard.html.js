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

module.exports = `<!-- # CE - camunda-cockpit-ui/client/scripts/pages/dashboard.html -->
<div class="ctn-view dashboard container-fluid">
  <div class="sections row">
    <div class="col-xs-12"
         ng-class="{'col-sm-8 col-lg-10': metricsPlugins.length}">


      <section class="actual"
               ng-class="{'loading': loadingActual,'section-collapsed': !actualActive}">
        <button uib-tooltip="{{ 'DASHBOARD_TOGGLE_SECTION' | translate }}"
                class="section-toggle btn btn-link btn-sm"
                ng-click="toggleSection('actual')">
          <span class="glyphicon"
                ng-class="{'glyphicon-menu-down': !actualActive, 'glyphicon-menu-up': actualActive}"></span>
        </button>

        <div class="inner">
          <header>
            <div class="row">
              <h1 class="col-xs-12 section-title">{{ 'DASHBOARD_RIGHT_NOW' | translate }}</h1>
            </div>
          </header>

          <div class="row stats"
               ng-if="actualActive">
            <div class="stats-section process-instances col-xs-6 col-md-4">
              <div cam-pie-chart
                   values="values.procInst"
                   placeholder="{{ 'DASHBOARD_RUNNING_PROCESS_INSTANCE' | translate }}"></div>
              <a class="value"
                 href="#/processes?searchQuery=%5B%7B%22type%22:%22PIunfinished%22,%22operator%22:%22eq%22,%22value%22:%22%22,%22name%22:%22%22%7D%5D"
                 ng-if="hasProcessSearch">
                {{ (!data.actual.runningProcessInstances ? 0 : '') }}
                {{ data.actual.runningProcessInstances | abbreviateNumber }}
              </a>
              <a class="value"
                 href="#/processes"
                 ng-if="!hasProcessSearch">
                {{ (!data.actual.runningProcessInstances ? 0 : '') }}
                {{ data.actual.runningProcessInstances | abbreviateNumber }}
              </a>
            </div>

            <div class="stats-section open-incidents col-xs-6 col-md-4">
              <div cam-pie-chart
                   values="values.procIncid"
                   placeholder="{{ 'DASHBOARD_OPEN_INCIDENTS' | translate }}"></div>
              <a class="value"
                 href="#/processes?searchQuery=%5B%7B%22type%22:%22PIwithRootIncidents%22,%22operator%22:%22eq%22,%22value%22:%22%22,%22name%22:%22%22%7D,%7B%22type%22:%22PIincidentStatus%22,%22operator%22:%22eq%22,%22value%22:%22open%22,%22name%22:%22%22%7D%5D"
                 ng-if="hasProcessSearch">
                {{ (!data.actual.openIncidents ? 0 : '') }}
                {{ data.actual.openIncidents | abbreviateNumber }}
              </a>
              <a class="value"
                 href="#/processes"
                 ng-if="!hasProcessSearch">
                {{ (!data.actual.openIncidents ? 0 : '') }}
                {{ data.actual.openIncidents | abbreviateNumber }}
              </a>
            </div>

            <div class="stats-section open-human-tasks col-xs-6 col-md-4">
              <div cam-pie-chart
                   values="values.tasks"
                   placeholder="{{ 'DASHBOARD_OPEN_HUMAN_TASKS' | translate}}"></div>
              <a class="value"
                 href="#/tasks">
                {{ (!data.actual.tasks ? 0 : '') }}
                {{ data.actual.tasks | abbreviateNumber }}
              </a>
            </div>
          </div>
        </div>
      </section>


      <section class="statistics"
               ng-class="{'section-collapsed': !statisticsActive}"
               ng-if="statisticsPlugins.length">
        <button uib-tooltip="{{ 'DASHBOARD_TOGGLE_SECTION' | translate }}"
                class="section-toggle btn btn-link btn-sm"
                ng-click="toggleSection('statistics')">
          <span class="glyphicon"
                ng-class="{'glyphicon-menu-down': !statisticsActive, 'glyphicon-menu-up': statisticsActive}"></span>
        </button>

        <div class="inner">
          <header>
            <h1 class="section-title">{{ 'DASHBOARD_STATISTICS' | translate }}</h1>
          </header>

          <div class="row stats"
               ng-if="statisticsActive">
            <div ng-repeat="plugin in statisticsPlugins"
                 data-plugin-id="{{ plugin.id }}"
                 class="stats-section col-md-12 col-lg-6 entry">
              <h4>{{ plugin.label }}</h4>
              <view vars="statisticsVars"
                    provider="plugin"
                    class="row"></view>
            </div>
          </div>
        </div>
      </section>


      <section class="metrics"
               ng-class="{'section-collapsed': !metricsActive}"
               ng-if="metricsPlugins.length">
        <button uib-tooltip="{{ 'DASHBOARD_TOGGLE_SECTION' | translate }}"
                class="section-toggle btn btn-link btn-sm"
                ng-click="toggleSection('metrics')">
          <span class="glyphicon"
                ng-class="{'glyphicon-menu-down': !metricsActive, 'glyphicon-menu-up': metricsActive}"></span>
        </button>

        <div class="inner">
          <header>
            <div class="row">
              <h1 class="col-xs-3 section-title">{{ 'DASHBOARD_METRICS' | translate }}</h1>

              <div class="col-xs-9 text-right"
                   ng-if="metricsActive">
                <ul class="nav nav-tabs">
                  <li ng-class="{active: metricsPeriod === 'day'}">
                    <a ng-click="setMetricsPeriod('day')">{{ 'DASHBOARD_TODAY' | translate }}</a>
                  </li>

                  <li ng-class="{active: metricsPeriod === 'week'}">
                    <a ng-click="setMetricsPeriod('week')">{{ 'DASHBOARD_THIS_WEEK' | translate }}</a>
                  </li>

                  <li ng-class="{active: metricsPeriod === 'month'}">
                    <a ng-click="setMetricsPeriod('month')">{{ 'DASHBOARD_THIS_MONTH' | translate }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </header>


          <div class="row stats"
               ng-if="metricsActive">
            <div ng-repeat="plugin in metricsPlugins"
                 data-plugin-id="{{ plugin.id }}"
                 class="stats-section col-md-6 col-lg-4 entry">
              <h4>{{ plugin.label | translate }}</h4>
              <view vars="metricsVars"
                    provider="plugin"
                    period="metricsPeriod"
                    class="row"></view>
            </div>
          </div>
        </div>
      </section>

      <section class="deployed no-metrics"
               ng-class="{'loading': loadingDeployed,'section-collapsed': !deployedActive}"
               ng-if="!metricsPlugins.length">
        <button uib-tooltip="{{ 'DASHBOARD_TOGGLE_SECTION' | translate }}"
                class="section-toggle btn btn-link btn-sm"
                ng-click="toggleSection('deployed')">
          <span class="glyphicon"
                ng-class="{'glyphicon-menu-down': !deployedActive, 'glyphicon-menu-up': deployedActive}"></span>
        </button>

        <div class="inner">
          <header>
            <h1 class="section-title">{{ 'DASHBOARD_DEPLOYED' | translate }}</h1>
          </header>

          <div class="row stats"
               ng-if="deployedActive">
            <div class="stats-section processes col-xs-6 col-lg-3">
              <div class="stats-label">{{ 'DASHBOARD_PROCESS_DEFINITIONS' | translate }}</div>
              <a class="value"
                 href="#/processes">
                {{ (!data.deployed.processDefinitions ? 0 : '') }}
                {{ data.deployed.processDefinitions | abbreviateNumber }}
              </a>
            </div>

            <div class="stats-section decisions col-xs-6 col-lg-3">
              <div class="stats-label">{{ 'DASHBOARD_DECISION_DEFINITIONS' | translate }}</div>
              <a class="value"
                 href="#/decisions">
                {{ (!data.deployed.decisionDefinitions ? 0 : '') }}
                {{ data.deployed.decisionDefinitions | abbreviateNumber }}
              </a>
            </div>

            <div class="stats-section cases col-xs-6 col-lg-3">
              <div class="stats-label">{{ 'DASHBOARD_CASE_DEFINITIONS' | translate }}</div>
              <a class="value"
                 href="#/cases"
                 ng-if="hasCaseSearch">
                {{ (!data.deployed.caseDefinitions ? 0 : '') }}
                {{ data.deployed.caseDefinitions | abbreviateNumber }}
              </a>
              <span class="value"
                    ng-if="!hasCaseSearch">
                {{ (!data.deployed.caseDefinitions ? 0 : '') }}
                {{ data.deployed.caseDefinitions | abbreviateNumber }}
              </span>
            </div>

            <div class="stats-section deployments col-xs-6 col-lg-3">
              <div class="stats-label">{{ 'DASHBOARD_DEPLOYMENTS' | translate }}</div>
              <a class="value"
                 href="#/repository">
                {{ (!data.deployed.deploymentDefinitions ? 0 : '') }}
                {{ data.deployed.deploymentDefinitions | abbreviateNumber }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>


    <section class="col-xs-12 col-sm-4 col-lg-2 deployed"
             ng-class="{'loading': loadingDeployed, 'section-collapsed': !deployedActive}"
             ng-if="metricsPlugins.length">
      <button uib-tooltip="{{ 'DASHBOARD_TOGGLE_SECTION' | translate }}"
              class="section-toggle btn btn-link btn-sm"
              ng-click="toggleSection('deployed')">
        <span class="glyphicon"
              ng-class="{'glyphicon-menu-down': !deployedActive, 'glyphicon-menu-up': deployedActive}"></span>
      </button>

      <div class="inner">
        <header>
          <h1 class="section-title">{{ 'DASHBOARD_DEPLOYED' | translate }}</h1>
        </header>

        <div class="row stats"
             ng-if="deployedActive">
          <div class="stats-section processes col-sm-12 col-md-6 col-lg-12">
            <div class="stats-label">{{ 'DASHBOARD_PROCESS_DEFINITIONS' | translate }}</div>
            <a class="value"
               href="#/processes">
              {{ (!data.deployed.processDefinitions ? 0 : '') }}
              {{ data.deployed.processDefinitions | abbreviateNumber }}
            </a>
          </div>

          <div class="stats-section decisions col-sm-12 col-md-6 col-lg-12">
            <div class="stats-label">{{ 'DASHBOARD_DECISION_DEFINITIONS' | translate }}</div>
            <a class="value"
               href="#/decisions">
              {{ (!data.deployed.decisionDefinitions ? 0 : '') }}
              {{ data.deployed.decisionDefinitions | abbreviateNumber }}
            </a>
          </div>

          <div class="stats-section cases col-sm-12 col-md-6 col-lg-12">
            <div class="stats-label">{{ 'DASHBOARD_CASE_DEFINITIONS' | translate }}</div>
            <a class="value"
               href="#/cases"
               ng-if="hasCaseSearch">
              {{ (!data.deployed.caseDefinitions ? 0 : '') }}
              {{ data.deployed.caseDefinitions | abbreviateNumber }}
            </a>
            <span class="value"
                  ng-if="!hasCaseSearch">
              {{ (!data.deployed.caseDefinitions ? 0 : '') }}
              {{ data.deployed.caseDefinitions | abbreviateNumber }}
            </span>
          </div>

          <div class="stats-section deployments col-sm-12 col-md-6 col-lg-12">
            <div class="stats-label">{{ 'DASHBOARD_DEPLOYMENTS' | translate }}</div>
            <a class="value"
               href="#/repository">
              {{ (!data.deployed.deploymentDefinitions ? 0 : '') }}
              {{ data.deployed.deploymentDefinitions | abbreviateNumber }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>




  <section class="deprecate"
           ng-if="deprecateDashboardProviders.length"
           ng-class="{'section-collapsed': !deprecateActive}">
    <button uib-tooltip="{{ 'DASHBOARD_TOGGLE_SECTION' | translate }}"
            class="section-toggle btn btn-link btn-sm"
            ng-click="toggleSection('deprecate')">
      <span class="glyphicon"
            ng-class="{'glyphicon-menu-down': !deprecateActive, 'glyphicon-menu-up': deprecateActive}"></span>
    </button>

    <div class="inner">
      <header>
        <div class="row">
          <h1 class="section-title col-xs-4">{{ 'DASHBOARD_CUSTOM_PLUGINS' | translate }}</h1>
          <div class="col-xs-8 text-right"></div>
        </div>
      </header>

      <div ng-if="deprecateActive"
           ng-repeat="plugin in deprecateDashboardProviders"
           class="deprecate-dashboard-view row"
           data-plugin-id="{{ plugin.id }}">
        <view vars="dashboardVars"
              provider="plugin"></view>
      </div>
    </div>
  </section>
</div>
<!-- / CE - camunda-cockpit-ui/client/scripts/pages/dashboard.html -->
`;
