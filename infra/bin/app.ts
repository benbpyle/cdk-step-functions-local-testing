#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { MainStack } from "../main-stack";

const app = new cdk.App();

new MainStack(app, `LocalTesting`);
