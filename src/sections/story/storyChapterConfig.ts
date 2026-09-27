export type StoryChapterConfig = {
  id: string
  bodyKeys: string[]
  progressStart: number
  progressEnd: number
}

export const STORY_CHAPTERS: StoryChapterConfig[] = [
  {
    id: 'intro',
    bodyKeys: ['storyIntro'],
    progressStart: 0,
    progressEnd: 0.1,
  },
  {
    id: 'ch01',
    bodyKeys: ['storyChapter01'],
    progressStart: 0.1,
    progressEnd: 0.22,
  },
  {
    id: 'ch02',
    bodyKeys: ['storyChapter02'],
    progressStart: 0.22,
    progressEnd: 0.34,
  },
  {
    id: 'ch03',
    bodyKeys: ['storyChapter03'],
    progressStart: 0.34,
    progressEnd: 0.46,
  },
  {
    id: 'ch04',
    bodyKeys: ['storyChapter04a', 'storyChapter04b', 'storyChapter04c'],
    progressStart: 0.46,
    progressEnd: 0.62,
  },
  {
    id: 'ch05',
    bodyKeys: ['storyChapter05'],
    progressStart: 0.62,
    progressEnd: 0.74,
  },
  {
    id: 'ch06',
    bodyKeys: ['storyChapter06'],
    progressStart: 0.74,
    progressEnd: 0.84,
  },
  {
    id: 'epilogue',
    bodyKeys: ['storyEpilogue'],
    progressStart: 0.84,
    progressEnd: 0.9,
  },
  {
    id: 'final',
    bodyKeys: ['storyFinalVariable'],
    progressStart: 0.9,
    progressEnd: 0.96,
  },
  {
    id: 'closing',
    bodyKeys: ['storyClosing'],
    progressStart: 0.96,
    progressEnd: 1,
  },
]
