"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var axios_1 = __importDefault(require("axios"));
var commander_1 = __importDefault(require("commander"));
commander_1.default.version('1.0.0');
commander_1.default
    .option('-u, --url <url>', 'Rocket.chat Webhooks URL')
    .option('-m, --message <message>', 'Message to send')
    .option('-p, --project <project>', 'Project name')
    .option('-r, --result <result>', 'Type of message: success, error, normal')
    .option('-v, --version <build>', 'Build version')
    .option('-s, --sender <sender>', 'Sender name')
    .option('-b, --branch <branch>', 'Branch name');
commander_1.default.parse(process.argv);
if (commander_1.default.url === undefined) {
    if (process.env.ROCKETCHAT_URL === undefined) {
        console.error('Você precisa definir o ROCKETCHAT_URL ou informar via parametro --url.');
        process.exit(1);
    }
    commander_1.default.url = process.env.ROCKETCHAT_URL;
}
if (commander_1.default.sender === undefined) {
    commander_1.default.sender = process.env.RC_ALIAS || 'Gitlab CI';
}
if (commander_1.default.project === undefined) {
    commander_1.default.project = process.env.RC_PROJECT || process.env.CI_PROJECT_PATH || 'projeto não definido';
}
if (commander_1.default.build === undefined) {
    commander_1.default.build = process.env.BUILD_NUMBER || 'v0.0.0';
}
if (commander_1.default.message === undefined) {
    if (process.env.RC_TEXT === undefined) {
        console.error('Você precisa definir o RC_TEXT ou informar via parametro --message.');
        process.exit(1);
    }
    commander_1.default.message = process.env.RC_TEXT;
}
if (commander_1.default.result === undefined) {
    commander_1.default.result = process.env.RC_RESULT || 'normal';
}
if (commander_1.default.branch === undefined) {
    commander_1.default.branch = process.env.CI_COMMIT_REF_NAME || 'master';
}
var message = "Projeto: " + commander_1.default.project + "\nBranch: " + commander_1.default.branch + "\nVers\u00E3o: " + commander_1.default.build + "\nStatus: " + commander_1.default.result + "\n\n" + commander_1.default.message + "\n";
var sendMessage = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.post(commander_1.default.url, {
                        alias: commander_1.default.sender,
                        text: message,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })];
            case 1:
                result = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log("Ocorreu um erro: $err");
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
sendMessage();
//# sourceMappingURL=index.js.map