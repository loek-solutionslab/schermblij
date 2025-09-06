import * as migration_20241125_222020_initial from './20241125_222020_initial';
import * as migration_20241214_124128 from './20241214_124128';
import * as migration_20250904_132109_collections_setup from './20250904_132109_collections_setup';
import * as migration_20250904_132225_globals_setup from './20250904_132225_globals_setup';
import * as migration_20250904_133400_relume_blocks_setup from './20250904_133400_relume_blocks_setup';
import * as migration_20250906_200000_add_banner_block from './20250906_200000_add_banner_block';

export const migrations = [
  {
    up: migration_20241125_222020_initial.up,
    down: migration_20241125_222020_initial.down,
    name: '20241125_222020_initial',
  },
  {
    up: migration_20241214_124128.up,
    down: migration_20241214_124128.down,
    name: '20241214_124128',
  },
  {
    up: migration_20250904_132109_collections_setup.up,
    down: migration_20250904_132109_collections_setup.down,
    name: '20250904_132109_collections_setup',
  },
  {
    up: migration_20250904_132225_globals_setup.up,
    down: migration_20250904_132225_globals_setup.down,
    name: '20250904_132225_globals_setup',
  },
  {
    up: migration_20250904_133400_relume_blocks_setup.up,
    down: migration_20250904_133400_relume_blocks_setup.down,
    name: '20250904_133400_relume_blocks_setup'
  },
  {
    up: migration_20250906_200000_add_banner_block.up,
    down: migration_20250906_200000_add_banner_block.down,
    name: '20250906_200000_add_banner_block'
  },
];
