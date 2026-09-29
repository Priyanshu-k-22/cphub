import AdminContentManager from "../components/AdminContentManager";

export default function SystemDesignAdmin() {
    return <AdminContentManager kind="systemDesign" title="System Design" description="Manage system design learning resources." categoryLabel="Level" categoryOptions={["Beginner", "Intermediate", "Advanced"]} />;
}
