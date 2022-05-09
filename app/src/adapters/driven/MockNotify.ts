
import { Assessment } from "../../application/domain/Assessment";
import { Location } from "../../application/domain/Location";
import { Publication } from "../../application/domain/Publication";
import { User } from "../../application/domain/User";
import { INotify } from "./ports/INotify";
import { IRepository } from "./ports/IRepository";

export class MockNotify implements INotify {
    notifyBySockLater(email: String, title: String, body: String): Promise<boolean> {
        return Promise.resolve("Success").then(function (value) {
            return true;
        })
    }
    notifyByPushLater(email: String, title: String, body: String): Promise<boolean> {
        return Promise.resolve("Success").then(function (value) {
            return true;
        })
    }
    notifyByEmailLater(email: String, title: String, body: String): Promise<boolean> {
        return Promise.resolve("Success").then(function (value) {
            return true;
        })
    }
    notifyByEmail(email: String, title: String, body: String): Promise<boolean> {
        return Promise.resolve("Success").then(function (value) {
            return true;
        })
    }
    notifyBySock(userId: String, title: String, body: String): Promise<boolean> {
        return Promise.resolve("Success").then(function (value) {
            return true;
        })
    }
    notifyByPush(email: String, title: String, body: String): Promise<boolean> {
        return Promise.resolve("Success").then(function (value) {
            return true;
        })
    }
}