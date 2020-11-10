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

module.exports = `<!-- # CE - camunda-commons-ui/lib/widgets/variables-table/test/fancy-modal.html -->
<div class="modal-header">
  <h3>Inspect "{{ variable.name }}" variable</h3>
</div>

<div class="modal-body">
  <div class="row"
       ng-if="readonly">
    <div class="col-xs-8">
      <p>
        Object type name:<br />
        <code>{{ variable.valueInfo.objectTypeName }}</code>
      </p>

      <p>
        Serialization Data Format:<br />
        <code>{{ variable.valueInfo.serializationDataFormat }}</code>
      </p>
    </div>

    <div class="col-xs-4">
      <img class="img-responsive"
           src="data:image/jpeg;base64,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" />
      <i>Cuteness has a posse</i>
    </div>
  </div>

  <div ng-if="!readonly"
       style="margin-top: 3em">
    <div class="form-group">
      <label for="object-type-name">Object type name</label>
      <input type="text"
             id="object-type-name"
             class="form-control"
             ng-model="variable.valueInfo.objectTypeName" />
    </div>

    <div class="form-group">
      <label for="serialization-data-format">Serialization data format</label>
      <input type="text"
             id="serialization-data-format"
             class="form-control"
             ng-model="variable.valueInfo.serializationDataFormat" />
    </div>
  </div>

  <div class="form-group">
    <label for="serialized-value">Serialized value</label>
    <textarea ng-model="variable.value"
              id="serialized-value"
              rows="10"
              class="form-control"
              ng-disabled="readonly"></textarea>
  </div>
</div>

<div class="modal-footer">
  <button class="btn btn-default"
          ng-click="$dismiss('close')">
    Close
  </button>

  <button class="btn btn-primary"
          ng-if="!readonly"
          ng-disabled="!hasChanged('serialized')"
          ng-click="$close(variable)">
    Change
  </button>
</div>
<!-- / CE - camunda-commons-ui/lib/widgets/variables-table/test/fancy-modal.html -->
`;
