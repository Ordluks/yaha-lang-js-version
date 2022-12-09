import { template, templateSettings } from 'lodash'

templateSettings.interpolate = /\{\{(.+?)\}\}/g
templateSettings.evaluate = /\{\%(.+?)\%\}/g
templateSettings.escape = /\{\{-(.+?)\}\}/g

export const pathArgDescription = template('path to program file')
export const invalidPath = template('Invalid path - {{path}}')
export const fileUnexists = template('File not exists - {{path}}')
export const internalError = template('Internal error')
export const unknownChar = template('unknown character {{char}}')
