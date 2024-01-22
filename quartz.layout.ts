import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      Twitter: "https://twitter.com/drill_sizeS",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.MobileOnly(Component.Darkmode()),
    Component.DesktopOnly(Component.RecentNotes({
      title: "Recently Note",
      limit: 10,
      filter: (f) => f.slug!.startsWith("Infinity-Drawer/") && !f.slug!.startsWith("Reference-Notes/"),
      sort:(f1, f2) => {
        if (f1.dates?.modified && !f2.dates?.modified) {
          // prioritize files with dates
          return -1
        } else if (!f1.dates?.modified && f2.dates?.modified) {
          return 1
        }
    
        // otherwise, sort lexographically by title
        const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
        const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
        return f1Title.localeCompare(f2Title)
      },
      linkToMore: "Infinity-Drawer/" as SimpleSlug,
    })),
  ],
  right: [
    Component.DesktopOnly(Component.Darkmode()),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  right: [],
}
