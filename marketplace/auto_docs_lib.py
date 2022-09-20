import json
import os
import glob
import re

PATH_DOCUMENTATION_JSON = 'projects/ng_bds/documentation/documentation.json'
PATH_SHOWCASE_DOCS = 'src/app/data/docs/components'
ENCODING = 'utf-8'
COMMON_PATTERN = '[\n \[\{\"a-zA-Z\:\,\[\]\-\'áéíóúñÁÉÍÓÚÑ\<\>\\\/0-9\{\}\.\=\&\;\(\)\#\!\`\+\_\|\@\*?\$]'
COMPONENTS_PATTERN = 'components:'+COMMON_PATTERN+'*directives:'
DIRECTIVES_PATTERN = 'directives:'+COMMON_PATTERN+'*};'
READ_MODE = 'r'
WRITE_MODE = 'w'
COMPONENT_KEYS_DELETE = {'directKeys':
                         ['id', 'file', 'changeDetection', 'encapsulation', 'entryComponents', 'inputs', 'outputs', 'providers', 'styleUrls', 'styles', 'templateUrl', 'viewProviders', 'propertiesClass',
                             'hostBindings', 'hostListeners', 'sourceCode', 'assetsDirs', 'styleUrlsData', 'stylesData', 'jsdoctags', 'constructorObj', 'implements', 'templateData', 'template'],
                         'methodsClass': [
                             {'key': 'name', 'value': 'ngAfterViewInit'},
                             {'key': 'name', 'value': 'ngOnChanges'},
                             {'key': 'name', 'value': 'ngAfterContentChecked'},
                             {'key': 'name', 'value': 'ngOnInit'},
                             {'key': 'name', 'value': 'ngDoCheck'},
                             {'key': 'name', 'value': 'ngAfterContentInit'},
                             {'key': 'name', 'value': 'ngAfterViewChecked'},
                             {'key': 'name', 'value': 'ngOnDestroy'},
                             {'key': 'line', 'value': 'deleteKey'},
                             {'key': 'jsdoctags', 'value': 'deleteKey'},
                         ],
                         'inputsClass': [{'key': 'line', 'value': 'deleteKey'}],
                         'outputsClass': [{'key': 'line', 'value': 'deleteKey'}]
                         }


class AngularDoc:
    def __init__(self):
        self.jsonCompoDoc = ''
        self.moduleJsonName = ''
        self.componentsJsonModuleName = []
        self.componentsJsonDetail = []
        self.directivesJsonDetail = []
        self.angularTsDirectory = ''
        self.angularTsFile = ''
        self.routeAngularTs = ''
        self.fileAngularTs = ''
        self.newFragmentComponents = ''
        self.newFragmentDirectives = ''

    def docStart(self):
        self.openJsonCompoDoc()
        self.cleanJsonComponent()
        self.updateDoc()

    def openJsonCompoDoc(self):
        with open(PATH_DOCUMENTATION_JSON, encoding=ENCODING) as json_file:
            self.jsonCompoDoc = json.load(json_file)

    def updateDoc(self):
        for jsonObj in self.jsonCompoDoc['modules']:
            self.getInfoJsonCompoDoc(jsonObj)
            self.updateAngularShowcaseDoc()

    def getInfoJsonCompoDoc(self, jsonObj):
        self.moduleJsonName = jsonObj['name']
        self.componentsJsonModuleName = self.getComponentsJsonModule(
            jsonObj['children'])
        self.componentsJsonDetail = self.getJsonDetailComponent('components')
        self.directivesJsonDetail = self.getJsonDetailComponent('directives')

    def getComponentsJsonModule(self, children):
        components = {}
        for child in children:
            if(child['type'] == 'declarations'):
                components = child['elements']
        return components

    def getJsonDetailComponent(self, type):
        componentsDetail = []
        for componentJson in self.componentsJsonModuleName:
            for jsonObj in self.jsonCompoDoc[type]:
                if(jsonObj['name'] == componentJson['name']):
                    componentsDetail.append(jsonObj)
        componentsDetail = self.formatJson(componentsDetail)
        return componentsDetail

    def formatJson(self, jsonObj):
        return json.dumps(jsonObj, indent=2, ensure_ascii=False)

    def cleanJsonComponent(self):
        self.deleteKeys('components')
        self.deleteKeys('directives')

    def deleteKeys(self, type):
        for jsonObj in self.jsonCompoDoc[type]:
            self.deleteDirectKeys(jsonObj)
            self.deleteArraysOfObj(jsonObj, 'methodsClass')
            self.deleteArraysOfObj(jsonObj, 'inputsClass')
            self.deleteArraysOfObj(jsonObj, 'outputsClass')

    def deleteArraysOfObj(self, jsonObj, keyToModify):
        deleteItems = []
        for indexObj, obj in enumerate(jsonObj[keyToModify]):
            for indexMethod, keyToDelete in enumerate(COMPONENT_KEYS_DELETE[keyToModify]):
                keyToDeleteName = keyToDelete['key']
                keyToDeleteValue = keyToDelete['value']
                if keyToDeleteName in obj and obj[keyToDeleteName] == keyToDeleteValue:
                    deleteItems.append(indexObj)
                elif keyToDeleteName in obj and keyToDeleteValue == 'deleteKey':
                    del jsonObj[keyToModify][indexObj][keyToDeleteName]
        deleteItems.sort(reverse=True)
        for deleteItem in deleteItems:
            del jsonObj[keyToModify][deleteItem]

    def deleteDirectKeys(self, jsonObj):
        for key in COMPONENT_KEYS_DELETE['directKeys']:
            if key in jsonObj:
                del jsonObj[key]

    def updateAngularShowcaseDoc(self):
        # r=root, d=directories, f = files
        for route, directories, files in os.walk(PATH_SHOWCASE_DOCS):
            self.routeAngularTs = route
            for file in files:
                self.fileAngularTs = file
                self.checkAngularTs()

    def checkAngularTs(self):
        if 'angular.ts' in self.fileAngularTs:
            self.updateAngularTs()

    def updateAngularTs(self):
        module = self.findJsonModuleInAngular()
        if module != '':
            self.replaceFragment()

    def replaceFragment(self):
        self.getFormatReplaceCom()
        self.updateKeyOfTs(COMPONENTS_PATTERN, self.newFragmentComponents)
        self.updateKeyOfTs(DIRECTIVES_PATTERN, self.newFragmentDirectives)

    def updateKeyOfTs(self, pattern, newFragment):
        self.openAngularFile(READ_MODE)
        txt = self.angularTsFile.read()
        fragmentToReplace = re.findall(pattern, txt)
        self.updateComponents(fragmentToReplace, newFragment, txt)

    def getFormatReplaceCom(self):
        self.newFragmentComponents = "components:" + \
            self.componentsJsonDetail+",directives:"
        self.newFragmentDirectives = "directives:"+self.directivesJsonDetail+"};"

    def updateComponents(self, componentsFragmentToReplace, newFragmentComponents, txt):
        if(componentsFragmentToReplace):
            txt = txt.replace(
                componentsFragmentToReplace[0], newFragmentComponents)
            self.openAngularFile(WRITE_MODE)
            self.angularTsFile.write(txt)
            self.angularTsFile.close()

    def openAngularFile(self, mode):
        self.angularTsDirectory = os.path.join(
            self.routeAngularTs, self.fileAngularTs)
        self.angularTsFile = open(
            self.angularTsDirectory, mode, encoding=ENCODING)

    def findJsonModuleInAngular(self):
        self.openAngularFile(READ_MODE)
        module = ''
        for line in self.angularTsFile:
            moduleShowcaseDoc = self.getModuleShowcaseDoc(line)
            if moduleShowcaseDoc != '':
                if moduleShowcaseDoc.strip() == self.moduleJsonName.strip():
                    module = moduleShowcaseDoc.strip()
        self.angularTsFile.close()
        return module

    def getModuleShowcaseDoc(self, line):
        regImport = "import[ ]*{[ a-zA-Z]*}"
        searchImport = re.search(regImport, line)
        module = ''
        if searchImport:
            foundImport = searchImport.group(0)
            regModule = "(import *{)|(})"
            module = re.sub(regModule, '', foundImport)
        return module


angularDoc = AngularDoc()
angularDoc.docStart()
