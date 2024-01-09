<template>
  <div>
    <button></button>
    <Designer :engine="engine">
      <Workbench>
        <StudioPanel>
          <template #logo>
            <LogoWidget />
          </template>
          <template #actions>
            <actions-widget />
          </template>
          <CompositePanel>
            <CompositePanelItem title="panels.Component" icon="Component">
              <ResourceWidget title="sources.Inputs" :sources="sources.Inputs" />
              <ResourceWidget title="sources.Layouts" :sources="sources.Layouts" />
              <ResourceWidget title="sources.Arrays" :sources="sources.Arrays" />
              <ResourceWidget title="sources.Displays" :sources="sources.Displays" />
            </CompositePanelItem>
            <CompositePanelItem title="panels.OutlinedTree" icon="Outline">
              <OutlineTreeWidget />
            </CompositePanelItem>
            <CompositePanelItem title="panels.History" icon="History">
              <HistoryWidget />
            </CompositePanelItem>
          </CompositePanel>
          <WorkspacePanel :style="{ height: '100%' }">
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget :use="['DESIGNABLE', 'JSONTREE', 'PREVIEW']" />
            </ToolbarPanel>
            <ViewportPanel
              :style="{
                height: '1000px',
                width: '750px',
                overflow: 'auto',
              }"
            >
              <ViewPanel type="DESIGNABLE">
                <ComponentTreeWidget :components="components"></ComponentTreeWidget>
              </ViewPanel>
              <ViewPanel type="JSONTREE" :scrollable="false">
                <template #default="tree, onChange">
                  <SchemaEditorWidget
                    :tree="tree"
                    @change="onChange"
                  ></SchemaEditorWidget>
                </template>
              </ViewPanel>
              <ViewPanel type="PREVIEW" :scrollable="false">
                <template #default="tree">
                  <PreviewWidget :tree="tree" />
                </template>
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
          <SettingsPanel title="panels.PropertySettings">
            <SettingsForm />
          </SettingsPanel>
        </StudioPanel>
      </Workbench>
    </Designer>
  </div>
</template>
<script lang="ts" setup>
import { createDesigner, GlobalRegistry } from "@pind/designable-core";

import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workbench,
  WorkspacePanel,
} from "@/design/prototypes/src";
import { SettingsForm } from "@/design/settings-form/src";
import { Field, FormPage, Input, FormLayout } from "@/nutuicomponents";

GlobalRegistry.registerDesignerLocales({
  "zh-CN": {
    sources: {
      Inputs: "输入控件",
      Layouts: "布局组件",
      Arrays: "自增组件",
      Displays: "展示组件",
    },
  },
  "en-US": {
    sources: {
      Inputs: "Inputs",
      Layouts: "Layouts",
      Arrays: "Arrays",
      Displays: "Displays",
    },
  },
});

const CompositePanelItem = CompositePanel.Item;

const engine = createDesigner({
  shortcuts: [],
  rootComponentName: "FormPage",
});

const components = {
  Field,
  FormPage,
  Input,
  FormLayout,
};

const sources = {
  Inputs: [Input],
  Arrays: [],
  Displays: [],
  Layouts: [FormLayout],
};
</script>
