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
 * CONTENT AVAILABILITY
 * ========================================
 */

export const getContentAvailability = async () =>
    (await api.get("/settings/admin/content")).data;

export const updateContentAvailability = async (settings) =>
    (await api.put("/settings/admin/content", settings)).data;

export const getContestSettings = async () =>
    (await api.get("/settings/admin/contests")).data;

export const updateContestSettings = async (settings) =>
    (await api.put("/settings/admin/contests", settings)).data;

export const getNotificationSettings = async () =>
    (await api.get("/settings/admin/notifications")).data;

export const updateNotificationSettings = async (settings) =>
    (await api.put("/settings/admin/notifications", settings)).data;

export const getSecuritySettings = async () =>
    (await api.get("/settings/admin/security")).data;

export const updateSecuritySettings = async (settings) =>
    (await api.put("/settings/admin/security", settings)).data;

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
