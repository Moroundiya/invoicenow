"use client";

import { invoiceTemplates } from "@/app/assets/data/invoiceTemplates";

import TemplateCard from "./TemplateCard";
import type { InvoiceTemplate } from "@/app/assets/types/invoiceType";

interface TemplateSelectorProps {
	selectedTemplate: InvoiceTemplate;
	onTemplateChange: (template: InvoiceTemplate) => void;
}

export default function TemplateSelector({
	selectedTemplate,
	onTemplateChange,
}: TemplateSelectorProps) {
	return (
		<section>
			<div className="mb-5">
				<h2 className="text-base font-semibold text-white sm:text-lg">
					Choose your template
				</h2>

				<p className="mt-1 text-sm text-slate-500">
					Select a design for your invoice. You can change it later.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{invoiceTemplates.map((template) => (
					<TemplateCard
						key={template.id}
						id={template.id}
						name={template.name}
						description={template.description}
						selected={selectedTemplate === template.id}
						onSelect={onTemplateChange}
					/>
				))}
			</div>
		</section>
	);
}
