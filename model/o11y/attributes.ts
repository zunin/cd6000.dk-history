/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//----------------------------------------------------------------------------------------------------------
// DO NOT EDIT, this is an Auto-generated file from scripts/semconv/templates/registry/stable/attributes.ts.j2
//----------------------------------------------------------------------------------------------------------

/**
 * The language of the telemetry SDK.
 */
export const ATTR_TELEMETRY_SDK_LANGUAGE = 'telemetry.sdk.language' as const;

/**
 * Enum value "cpp" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_CPP = "cpp" as const;

/**
 * Enum value "dotnet" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET = "dotnet" as const;

/**
 * Enum value "erlang" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG = "erlang" as const;

/**
 * Enum value "go" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_GO = "go" as const;

/**
 * Enum value "java" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_JAVA = "java" as const;

/**
 * Enum value "nodejs" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS = "nodejs" as const;

/**
 * Enum value "php" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_PHP = "php" as const;

/**
 * Enum value "python" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON = "python" as const;

/**
 * Enum value "ruby" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_RUBY = "ruby" as const;

/**
 * Enum value "rust" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_RUST = "rust" as const;

/**
 * Enum value "swift" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT = "swift" as const;

/**
 * Enum value "webjs" for attribute {@link ATTR_TELEMETRY_SDK_LANGUAGE}.
 */
export const TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = "webjs" as const;

/**
 * The name of the telemetry SDK as defined above.
 *
 * @example opentelemetry
 *
 * @note The OpenTelemetry SDK **MUST** set the `telemetry.sdk.name` attribute to `opentelemetry`.
 * If another SDK, like a fork or a vendor-provided implementation, is used, this SDK **MUST** set the
 * `telemetry.sdk.name` attribute to the fully-qualified class or module name of this SDK's main entry point
 * or another suitable identifier depending on the language.
 * The identifier `opentelemetry` is reserved and **MUST NOT** be used in this case.
 * All custom identifiers **SHOULD** be stable across different versions of an implementation.
 */
export const ATTR_TELEMETRY_SDK_NAME = 'telemetry.sdk.name' as const;

/**
 * The version string of the telemetry SDK.
 *
 * @example 1.2.3
 */
export const ATTR_TELEMETRY_SDK_VERSION = 'telemetry.sdk.version' as const;

