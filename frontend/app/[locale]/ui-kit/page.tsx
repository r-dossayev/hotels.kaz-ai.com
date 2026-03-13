'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  Radio,
  Toggle,
  Accordion,
  Modal,
  Alert,
  useToast,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Pagination,
} from '@/components/ui';
import { Container } from '@/components/layout';
import { Sidebar } from '@/components/layout';

/* ======================================
   Section Wrapper
   ====================================== */
function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
        <p className="mt-1 text-neutral-500 text-sm">{description}</p>
      </div>
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8">
        {children}
      </div>
    </section>
  );
}

/* ======================================
   UI Kit Page
   ====================================== */
export default function UIKitPage() {
  const t = useTranslations('uiKit');
  const tc = useTranslations('common');
  const { addToast } = useToast();

  // State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [radioValue, setRadioValue] = useState('option1');
  const [toggleChecked, setToggleChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectOptions = [
    { value: 'astana', label: 'Astana' },
    { value: 'almaty', label: 'Almaty' },
    { value: 'shymkent', label: 'Shymkent' },
    { value: 'aktau', label: 'Aktau' },
  ];

  const radioOptions = [
    { value: 'option1', label: 'Kaspi Pay' },
    { value: 'option2', label: 'Freedom Bank' },
    { value: 'option3', label: 'Bank Card' },
  ];

  const accordionItems = [
    { id: '1', title: t('accordionTitle1'), content: t('accordionContent1') },
    { id: '2', title: t('accordionTitle2'), content: t('accordionContent2') },
    { id: '3', title: t('accordionTitle3'), content: t('accordionContent3') },
  ];

  return (
    <Container>
      <div className="py-12 sm:py-16">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">

          {/* ---- COLORS ---- */}
          <Section id="colors" title={t('colors')} description={t('colorsDesc')}>
            <div className="space-y-6">
              {/* Primary */}
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-2">Primary</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { shade: '50', cls: 'bg-primary-50' },
                    { shade: '100', cls: 'bg-primary-100' },
                    { shade: '200', cls: 'bg-primary-200' },
                    { shade: '300', cls: 'bg-primary-300' },
                    { shade: '400', cls: 'bg-primary-400' },
                    { shade: '500', cls: 'bg-primary-500' },
                    { shade: '600', cls: 'bg-primary-600' },
                    { shade: '700', cls: 'bg-primary-700' },
                    { shade: '800', cls: 'bg-primary-800' },
                    { shade: '900', cls: 'bg-primary-900' },
                  ].map((c) => (
                    <div key={c.shade} className="text-center">
                      <div className={`w-12 h-12 rounded-xl ${c.cls} shadow-sm border border-neutral-200/50`} />
                      <span className="text-xs text-neutral-500 mt-1 block">{c.shade}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Secondary */}
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-2">Secondary</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { shade: '50', cls: 'bg-secondary-50' },
                    { shade: '100', cls: 'bg-secondary-100' },
                    { shade: '200', cls: 'bg-secondary-200' },
                    { shade: '300', cls: 'bg-secondary-300' },
                    { shade: '400', cls: 'bg-secondary-400' },
                    { shade: '500', cls: 'bg-secondary-500' },
                    { shade: '600', cls: 'bg-secondary-600' },
                    { shade: '700', cls: 'bg-secondary-700' },
                    { shade: '800', cls: 'bg-secondary-800' },
                    { shade: '900', cls: 'bg-secondary-900' },
                  ].map((c) => (
                    <div key={c.shade} className="text-center">
                      <div className={`w-12 h-12 rounded-xl ${c.cls} shadow-sm border border-neutral-200/50`} />
                      <span className="text-xs text-neutral-500 mt-1 block">{c.shade}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Neutral */}
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-2">Neutral</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { shade: '50', cls: 'bg-neutral-50' },
                    { shade: '100', cls: 'bg-neutral-100' },
                    { shade: '200', cls: 'bg-neutral-200' },
                    { shade: '300', cls: 'bg-neutral-300' },
                    { shade: '400', cls: 'bg-neutral-400' },
                    { shade: '500', cls: 'bg-neutral-500' },
                    { shade: '600', cls: 'bg-neutral-600' },
                    { shade: '700', cls: 'bg-neutral-700' },
                    { shade: '800', cls: 'bg-neutral-800' },
                    { shade: '900', cls: 'bg-neutral-900' },
                  ].map((c) => (
                    <div key={c.shade} className="text-center">
                      <div className={`w-12 h-12 rounded-xl ${c.cls} shadow-sm border border-neutral-200/50`} />
                      <span className="text-xs text-neutral-500 mt-1 block">{c.shade}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Semantic */}
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-2">Semantic</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Success', cls: 'bg-success-500' },
                    { label: 'Error', cls: 'bg-error-500' },
                    { label: 'Warning', cls: 'bg-warning-500' },
                    { label: 'Info', cls: 'bg-info-500' },
                  ].map((c) => (
                    <div key={c.label} className="text-center">
                      <div className={`w-12 h-12 rounded-xl ${c.cls} shadow-sm`} />
                      <span className="text-xs text-neutral-500 mt-1 block">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ---- TYPOGRAPHY ---- */}
          <Section id="typography" title={t('typography')} description={t('typographyDesc')}>
            <div className="space-y-4">
              <div><h1 className="!text-5xl">H1 — The quick brown fox</h1></div>
              <div><h2 className="!text-4xl">H2 — The quick brown fox</h2></div>
              <div><h3 className="!text-3xl">H3 — The quick brown fox</h3></div>
              <div><h4 className="!text-2xl">H4 — The quick brown fox</h4></div>
              <div><h5 className="!text-xl">H5 — The quick brown fox</h5></div>
              <div><h6 className="!text-lg">H6 — The quick brown fox</h6></div>
              <hr className="border-neutral-200" />
              <p className="text-base text-neutral-700">Body (base) — The quick brown fox jumps over the lazy dog. This is the default body text size used throughout the application.</p>
              <p className="text-sm text-neutral-500">Small — Used for helper text, captions, and secondary information.</p>
              <p className="text-xs text-neutral-400">Extra Small — Used for labels, badges, and timestamps.</p>
            </div>
          </Section>

          {/* ---- SPACING ---- */}
          <Section id="spacing" title={t('spacing')} description={t('spacingDesc')}>
            <div className="space-y-2">
              {[
                { label: '4px (1)', size: 'w-1' },
                { label: '8px (2)', size: 'w-2' },
                { label: '12px (3)', size: 'w-3' },
                { label: '16px (4)', size: 'w-4' },
                { label: '24px (6)', size: 'w-6' },
                { label: '32px (8)', size: 'w-8' },
                { label: '48px (12)', size: 'w-12' },
                { label: '64px (16)', size: 'w-16' },
                { label: '96px (24)', size: 'w-24' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-xs text-neutral-500 w-20 text-right font-mono">{item.label}</span>
                  <div className={`h-4 ${item.size} bg-primary-400 rounded`} />
                </div>
              ))}
            </div>
          </Section>

          {/* ---- BUTTONS ---- */}
          <Section id="buttons" title={t('buttons')} description={t('buttonsDesc')}>
            <div className="space-y-6">
              {((['primary', 'secondary', 'outline', 'ghost'] as const)).map((variant) => (
                <div key={variant}>
                  <p className="text-sm font-medium text-neutral-600 mb-3 capitalize">{variant}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant={variant} size="sm">Small</Button>
                    <Button variant={variant} size="md">Medium</Button>
                    <Button variant={variant} size="lg">Large</Button>
                    <Button variant={variant} loading>Loading</Button>
                    <Button variant={variant} disabled>Disabled</Button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ---- INPUTS ---- */}
          <Section id="inputs" title={t('inputs')} description={t('inputsDesc')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <Input
                label={t('defaultLabel')}
                placeholder={t('placeholder')}
                helperText={t('helperText')}
              />
              <Input
                label={t('errorLabel')}
                placeholder={t('placeholder')}
                error={t('errorText')}
                defaultValue="invalid@"
              />
              <Input
                label="Email"
                type="email"
                placeholder="example@mail.com"
                helperText="Automatically detects email type and adds @ icon"
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                helperText="Secure password field with visibility toggle"
              />
              <Input
                label={t('disabledLabel')}
                placeholder={t('placeholder')}
                disabled
              />
            </div>
          </Section>

          {/* ---- SELECTS ---- */}
          <Section id="selects" title={t('selects')} description={t('selectsDesc')}>
            <div className="max-w-sm">
              <Select
                label="City"
                options={selectOptions}
                value={selectValue}
                onChange={setSelectValue}
                placeholder={t('selectPlaceholder')}
              />
            </div>
          </Section>

          {/* ---- TEXTAREAS ---- */}
          <Section id="textareas" title={t('textareas')} description={t('textareasDesc')}>
            <div className="max-w-lg">
              <Textarea
                label="Message"
                placeholder={t('textareaPlaceholder')}
                helperText={t('helperText')}
              />
            </div>
          </Section>

          {/* ---- CHECKBOXES ---- */}
          <Section id="checkboxes" title={t('checkboxes')} description={t('checkboxesDesc')}>
            <div className="space-y-3">
              <Checkbox label="Free cancellation" defaultChecked />
              <Checkbox label="Breakfast included" />
              <Checkbox label="Pool access" />
              <Checkbox label="Disabled option" disabled />
            </div>
          </Section>

          {/* ---- RADIOS ---- */}
          <Section id="radios" title={t('radios')} description={t('radiosDesc')}>
            <Radio
              name="payment"
              label="Payment method"
              options={radioOptions}
              value={radioValue}
              onChange={setRadioValue}
            />
          </Section>

          {/* ---- TOGGLES ---- */}
          <Section id="toggles" title={t('toggles')} description={t('togglesDesc')}>
            <div className="space-y-4">
              <Toggle
                label="Email notifications"
                checked={toggleChecked}
                onChange={setToggleChecked}
              />
              <Toggle label="SMS notifications" />
              <Toggle label="Disabled toggle" disabled />
            </div>
          </Section>

          {/* ---- ACCORDION ---- */}
          <Section id="accordions" title={t('accordions')} description={t('accordionsDesc')}>
            <div className="max-w-2xl">
              <Accordion items={accordionItems} />
            </div>
          </Section>

          {/* ---- MODAL ---- */}
          <Section id="modals" title={t('modals')} description={t('modalsDesc')}>
            <Button onClick={() => setModalOpen(true)}>{t('openModal')}</Button>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={t('modalTitle')}>
              <p>{t('modalContent')}</p>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                  {tc('close')}
                </Button>
                <Button size="sm" onClick={() => setModalOpen(false)}>
                  {tc('confirm')}
                </Button>
              </div>
            </Modal>
          </Section>

          {/* ---- ALERTS ---- */}
          <Section id="alerts" title={t('alerts')} description={t('alertsDesc')}>
            <div className="space-y-3">
              <Alert variant="success" dismissible>{t('alertSuccess')}</Alert>
              <Alert variant="error" dismissible>{t('alertError')}</Alert>
              <Alert variant="warning" dismissible>{t('alertWarning')}</Alert>
              <Alert variant="info" dismissible>{t('alertInfo')}</Alert>
            </div>
          </Section>

          {/* ---- TOASTS ---- */}
          <Section id="toasts" title={t('toasts')} description={t('toastsDesc')}>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm" onClick={() => addToast(t('toastSuccess'), 'success')}>
                Success
              </Button>
              <Button variant="outline" size="sm" onClick={() => addToast(t('toastError'), 'error')}>
                Error
              </Button>
              <Button variant="outline" size="sm" onClick={() => addToast(t('toastWarning'), 'warning')}>
                Warning
              </Button>
              <Button variant="ghost" size="sm" onClick={() => addToast(t('toastInfo'), 'info')}>
                Info
              </Button>
            </div>
          </Section>

          {/* ---- BADGES ---- */}
          <Section id="badges" title={t('badges')} description={t('badgesDesc')}>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="success">{t('badgeSuccess')}</Badge>
              <Badge variant="pending">{t('badgePending')}</Badge>
              <Badge variant="cancelled">{t('badgeCancelled')}</Badge>
              <Badge variant="info">{t('badgeInfo')}</Badge>
              <Badge variant="warning">{t('badgeWarning')}</Badge>
            </div>
          </Section>

          {/* ---- CARDS ---- */}
          <Section id="cards" title={t('cards')} description={t('cardsDesc')}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} hover>
                  <div className="h-40 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold opacity-30">★★★★★</span>
                  </div>
                  <CardBody>
                    <Badge variant="success" className="mb-3">{t('badgeSuccess')}</Badge>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">{t('cardTitle')}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{t('cardDescription')}</p>
                  </CardBody>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-base font-bold text-primary-600">{t('cardPrice')}</span>
                    <Button size="sm">{t('cardAction')}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Section>

          {/* ---- SPINNERS ---- */}
          <Section id="spinners" title={t('spinners')} description={t('spinnersDesc')}>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <Spinner size="sm" />
                <p className="text-xs text-neutral-500 mt-2">Small</p>
              </div>
              <div className="text-center">
                <Spinner size="md" />
                <p className="text-xs text-neutral-500 mt-2">Medium</p>
              </div>
              <div className="text-center">
                <Spinner size="lg" />
                <p className="text-xs text-neutral-500 mt-2">Large</p>
              </div>
            </div>
          </Section>

          {/* ---- PAGINATION ---- */}
          <Section id="pagination" title={t('pagination')} description={t('paginationDesc')}>
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </Section>

          {/* ---- SIDEBAR ---- */}
          <Section id="sidebar" title="Sidebar" description="Responsive sidebar for dashboards. Click the button to trigger the slide-over overlay.">
            <div className="flex flex-col items-start gap-4">
              <Button onClick={() => setSidebarOpen(true)}>Open Sidebar Overlay</Button>
              <p className="text-sm text-neutral-500 italic">
                * Note: On desktop (LG screens), the sidebar is standard static on some pages, but here it triggers a slide-over for demonstration.
              </p>
            </div>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isStatic={false} />
          </Section>

        </div>
      </div>
    </Container>
  );
}
