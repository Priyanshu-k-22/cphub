import api from "../../../shared/api/client";

/*
 * ========================================
 * ALL ADMIN SETTINGS
 * ========================================
 */

export const getAdminSettings = async () =>
    (await api.get("/settings/admin")).data;

/*
 * ========================================
 * GENERAL SETTINGS
 * ========================================
 */

export const getGeneralSettings = async () =>
    (await api.get("/settings/admin/general")).data;

export const updateGeneralSettings = async (settings) =>
    (
        await api.put(
            "/settings/admin/general",
            settings
        )
    ).data;

/*
 * ========================================
 * AUTHENTICATION SETTINGS
 * ========================================
 */

export const getAuthenticationSettings = async () =>
    (
        await api.get(
            "/settings/admin/authentication"
        )
    ).data;

export const updateAuthenticationSettings = async (
    settings
) =>
    (
        await api.put(
            "/settings/admin/authentication",
            settings
        )
    ).data;

/*
 * ========================================
 * PUBLIC SETTINGS
 * ========================================
 */

export const getPublicSettings = async () =>
    (await api.get("/settings/public")).data;

/*
 * ========================================
 * LEGACY ENDPOINT
 * ========================================
 *
 * Keep this temporarily because other existing
 * code may still use it.
 */

export const updateAdminSettings = async (settings) =>
    (
        await api.put(
            "/settings/admin",
            settings
        )
    ).data;