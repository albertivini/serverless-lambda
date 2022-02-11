/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/generateCertificate.ts":
/*!**********************************************!*\
  !*** ./src/functions/generateCertificate.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handle\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _utils_dynamoDbClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dynamoDbClient */ \"./src/utils/dynamoDbClient.ts\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! handlebars */ \"handlebars\");\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(handlebars__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dayjs */ \"dayjs\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_6__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst compile = async (data) => {\r\n    const filePath = path__WEBPACK_IMPORTED_MODULE_3___default().join(process.cwd(), 'src', 'templates', 'certificate.hbs');\r\n    const html = fs__WEBPACK_IMPORTED_MODULE_4___default().readFileSync(filePath, 'utf-8');\r\n    return handlebars__WEBPACK_IMPORTED_MODULE_2___default().compile(html)(data);\r\n};\r\nconst handle = async (event) => {\r\n    const { id, name, grade } = JSON.parse(event.body);\r\n    const response = await _utils_dynamoDbClient__WEBPACK_IMPORTED_MODULE_0__.document.query({\r\n        TableName: \"users_certificate\",\r\n        KeyConditionExpression: \"id = :id\",\r\n        ExpressionAttributeValues: {\r\n            \":id\": id\r\n        }\r\n    }).promise();\r\n    const userAlreadyExists = response.Items[0];\r\n    if (userAlreadyExists) {\r\n        throw new Error('User already Exists');\r\n    }\r\n    await _utils_dynamoDbClient__WEBPACK_IMPORTED_MODULE_0__.document.put({\r\n        TableName: \"users_certificate\",\r\n        Item: {\r\n            id,\r\n            name,\r\n            grade,\r\n            created_at: new Date().getTime()\r\n        }\r\n    }).promise();\r\n    const medalPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(process.cwd(), 'src', 'templates', 'selo.png');\r\n    const medal = fs__WEBPACK_IMPORTED_MODULE_4___default().readFileSync(medalPath, 'base64');\r\n    const data = {\r\n        name,\r\n        id,\r\n        grade,\r\n        date: dayjs__WEBPACK_IMPORTED_MODULE_5___default()().format('DD/MM/YYYY'),\r\n        medal\r\n    };\r\n    const content = await compile(data);\r\n    const browser = await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_6___default().puppeteer.launch({\r\n        ignoreDefaultArgs: ['--disable-extensions'],\r\n        args: (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_6___default().args),\r\n        defaultViewport: (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_6___default().defaultViewport),\r\n        executablePath: await (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_6___default().executablePath),\r\n        headless: true\r\n    });\r\n    const page = await browser.newPage();\r\n    await page.setContent(content);\r\n    const pdf = await page.pdf({\r\n        format: 'a4',\r\n        landscape: true,\r\n        printBackground: true,\r\n        preferCSSPageSize: true,\r\n        path: process.env.IS_OFFLINE ? './certificate.pdf' : null\r\n    });\r\n    await browser.close();\r\n    const s3 = new aws_sdk__WEBPACK_IMPORTED_MODULE_1__.S3();\r\n    await s3.putObject({\r\n        Bucket: 'certificateignite',\r\n        Key: `${id}.pdf`,\r\n        ACL: 'public-read',\r\n        Body: pdf,\r\n        ContentType: \"application/pdf\"\r\n    }).promise();\r\n    return {\r\n        statusCode: 201,\r\n        body: JSON.stringify(response.Items[0]),\r\n    };\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2dlbmVyYXRlQ2VydGlmaWNhdGUudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVybGVzcy8uL3NyYy9mdW5jdGlvbnMvZ2VuZXJhdGVDZXJ0aWZpY2F0ZS50cz9hNWFlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiXHJcbmltcG9ydCB7IGRvY3VtZW50IH0gZnJvbSBcIi4uL3V0aWxzL2R5bmFtb0RiQ2xpZW50XCJcclxuaW1wb3J0IHsgUzMgfSBmcm9tIFwiYXdzLXNka1wiXHJcbmltcG9ydCBoYW5kbGViYXJzIGZyb20gXCJoYW5kbGViYXJzXCJcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcclxuaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiXHJcbmltcG9ydCBjaHJvbWl1bSBmcm9tIFwiY2hyb21lLWF3cy1sYW1iZGFcIlxyXG5cclxuaW50ZXJmYWNlIElDcmVhdGVDZXJ0aWZpY2F0ZSB7XHJcbiAgICBpZDogc3RyaW5nXHJcbiAgICBuYW1lOiBzdHJpbmdcclxuICAgIGdyYWRlOiBzdHJpbmdcclxuICAgIG1lZGFsOiBzdHJpbmdcclxuICAgIGRhdGU6IHN0cmluZ1xyXG59XHJcblxyXG5jb25zdCBjb21waWxlID0gYXN5bmMgIChkYXRhOiBJQ3JlYXRlQ2VydGlmaWNhdGUpID0+IHtcclxuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdzcmMnLCAndGVtcGxhdGVzJywgJ2NlcnRpZmljYXRlLmhicycpXHJcblxyXG4gICAgY29uc3QgaHRtbCA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwndXRmLTgnKVxyXG5cclxuICAgIHJldHVybiBoYW5kbGViYXJzLmNvbXBpbGUoaHRtbCkoZGF0YSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZSA6IEFQSUdhdGV3YXlQcm94eUhhbmRsZXI9IGFzeW5jIChldmVudCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IHsgaWQsIG5hbWUsIGdyYWRlIH0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpIGFzIElDcmVhdGVDZXJ0aWZpY2F0ZVxyXG4gICAgXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRvY3VtZW50LnF1ZXJ5KHtcclxuICAgICAgICBUYWJsZU5hbWU6IFwidXNlcnNfY2VydGlmaWNhdGVcIixcclxuICAgICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiBcImlkID0gOmlkXCIsXHJcbiAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xyXG4gICAgICAgICAgICBcIjppZFwiOiBpZFxyXG4gICAgICAgIH1cclxuICAgIH0pLnByb21pc2UoKVxyXG5cclxuICAgIGNvbnN0IHVzZXJBbHJlYWR5RXhpc3RzID0gcmVzcG9uc2UuSXRlbXNbMF1cclxuXHJcbiAgICBpZiAodXNlckFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VzZXIgYWxyZWFkeSBFeGlzdHMnKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhd2FpdCBkb2N1bWVudC5wdXQoe1xyXG4gICAgICAgIFRhYmxlTmFtZTogXCJ1c2Vyc19jZXJ0aWZpY2F0ZVwiLFxyXG4gICAgICAgIEl0ZW06IHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGdyYWRlLFxyXG4gICAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgICAgIH1cclxuICAgIH0pLnByb21pc2UoKVxyXG5cclxuXHJcbiAgICBjb25zdCBtZWRhbFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYycsICd0ZW1wbGF0ZXMnLCAnc2Vsby5wbmcnKVxyXG5cclxuICAgIGNvbnN0IG1lZGFsID0gZnMucmVhZEZpbGVTeW5jKG1lZGFsUGF0aCwgJ2Jhc2U2NCcpXHJcblxyXG4gICAgY29uc3QgZGF0YTogSUNyZWF0ZUNlcnRpZmljYXRlID0ge1xyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgZ3JhZGUsXHJcbiAgICAgICAgZGF0ZTogZGF5anMoKS5mb3JtYXQoJ0REL01NL1lZWVknKSxcclxuICAgICAgICBtZWRhbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBjb21waWxlKGRhdGEpXHJcblxyXG4gICAgY29uc3QgYnJvd3NlciA9IGF3YWl0IGNocm9taXVtLnB1cHBldGVlci5sYXVuY2goe1xyXG4gICAgICAgIGlnbm9yZURlZmF1bHRBcmdzOiBbJy0tZGlzYWJsZS1leHRlbnNpb25zJ10sXHJcbiAgICAgICAgYXJnczogY2hyb21pdW0uYXJncyxcclxuICAgICAgICBkZWZhdWx0Vmlld3BvcnQ6IGNocm9taXVtLmRlZmF1bHRWaWV3cG9ydCxcclxuICAgICAgICBleGVjdXRhYmxlUGF0aDogYXdhaXQgY2hyb21pdW0uZXhlY3V0YWJsZVBhdGgsXHJcbiAgICAgICAgaGVhZGxlc3M6IHRydWVcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgcGFnZSA9IGF3YWl0IGJyb3dzZXIubmV3UGFnZSgpXHJcblxyXG4gICAgYXdhaXQgcGFnZS5zZXRDb250ZW50KGNvbnRlbnQpXHJcblxyXG4gICAgY29uc3QgcGRmID0gYXdhaXQgcGFnZS5wZGYoe1xyXG4gICAgICAgIGZvcm1hdDogJ2E0JyxcclxuICAgICAgICBsYW5kc2NhcGU6IHRydWUsXHJcbiAgICAgICAgcHJpbnRCYWNrZ3JvdW5kOiB0cnVlLFxyXG4gICAgICAgIHByZWZlckNTU1BhZ2VTaXplOiB0cnVlLFxyXG4gICAgICAgIHBhdGg6IHByb2Nlc3MuZW52LklTX09GRkxJTkUgPyAnLi9jZXJ0aWZpY2F0ZS5wZGYnIDogbnVsbFxyXG4gICAgfSlcclxuXHJcbiAgICBhd2FpdCBicm93c2VyLmNsb3NlKClcclxuXHJcbiAgICBjb25zdCBzMyA9IG5ldyBTMygpXHJcblxyXG4gICAgYXdhaXQgczMucHV0T2JqZWN0KHtcclxuICAgICAgICBCdWNrZXQ6ICdjZXJ0aWZpY2F0ZWlnbml0ZScsXHJcbiAgICAgICAgS2V5OiBgJHtpZH0ucGRmYCxcclxuICAgICAgICBBQ0w6ICdwdWJsaWMtcmVhZCcsXHJcbiAgICAgICAgQm9keTogcGRmLFxyXG4gICAgICAgIENvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL3BkZlwiXHJcbiAgICB9KS5wcm9taXNlKClcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5JdGVtc1swXSksXHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/functions/generateCertificate.ts\n");

/***/ }),

/***/ "./src/utils/dynamoDbClient.ts":
/*!*************************************!*\
  !*** ./src/utils/dynamoDbClient.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"document\": () => (/* binding */ document)\n/* harmony export */ });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst options = {\r\n    region: \"localhost\",\r\n    endpoint: \"http://localhost:8000\",\r\n    accessKeyId: \"x\",\r\n    secretAccessKey: \"x\"\r\n};\r\nconst isOffline = () => {\r\n    return process.env.IS_OFFLINE;\r\n};\r\nconst document = isOffline() ? new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient(options) : new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMvZHluYW1vRGJDbGllbnQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NlcnZlcmxlc3MvLi9zcmMvdXRpbHMvZHluYW1vRGJDbGllbnQudHM/Y2FlNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEeW5hbW9EQiB9IGZyb20gXCJhd3Mtc2RrXCJcclxuXHJcbmNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICByZWdpb246IFwibG9jYWxob3N0XCIsXHJcbiAgICBlbmRwb2ludDogXCJodHRwOi8vbG9jYWxob3N0OjgwMDBcIixcclxuICAgIC8vIHBhcmEgcG9kZXIgdXNhciBvIGR5bmFtbyBvZmZsaW5lIHNlbSBwcmVjaXNhciBkZSBjcmVkZW5jaWFpcyBkYSBhd3NcclxuICAgIGFjY2Vzc0tleUlkOiBcInhcIixcclxuICAgIHNlY3JldEFjY2Vzc0tleTogXCJ4XCJcclxufVxyXG5cclxuY29uc3QgaXNPZmZsaW5lID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHByb2Nlc3MuZW52LklTX09GRkxJTkVcclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZG9jdW1lbnQgPSBpc09mZmxpbmUoKSA/IG5ldyBEeW5hbW9EQi5Eb2N1bWVudENsaWVudChvcHRpb25zKSA6IG5ldyBEeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/utils/dynamoDbClient.ts\n");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("chrome-aws-lambda");

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/generateCertificate.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;